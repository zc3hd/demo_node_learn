# node轻内核

* 前面也说了，node轻内核，也是写本地内置的包。
* node无web容器，没有静态资源的服务器，apache有web容器！如何实现？根据不同的req.url，读取不同的文件，分别不同地给响应回去，表现出web容器的感觉。其实路径和真实响应的文件路径地址是没有关系的。所有node适合做顶层路由设计。
* 路由设计，引出node就是做服务器的。主要用到的模块就是 http fs path 

### 1.http

* 用户从client发出请求到服务器，经历了什么？
```
1.用户端，先是访问DNS域名服务器，找到域名对应的IP
2.请求前，包装请求报文。
3.报文：报文头和报文体。头：就是一些信息的说明；体就是我们包装（要）的东西。
4.通过特定的端口进入服务器，服务器是个封闭的环境，只有端口port是门。
5.服务器拿到请求报文，分析，包装响应报文（头和体）进行响应。
```

```
var server = http.createServer(function(req,res){
    响应报文的头
    res.writeHead(200,{"content-Type":'text/html'})

    响应报文的体
    res.write('xxxxxxxxxxxxxxxxxx');
    res.write('xxxxxxxxxxxxxxxxxx');
    res.write('xxxxxxxxxxxxxxxxxx');
    res.write('xxxxxxxxxxxxxxxxxx');

    响应报文结束
    res.end()
});
server.listen(3000,'127.0.0.1');
```

* 读取文件进行响应
```
fs.readFile('./info/data.txt',...);路径是当前命名执行的路径下的相对路径。
fs.mkdir('./aa/aa/aa',fn);
fs.stat('./dir/some',function(err,data){});
改名和换地址
fs.rename(oldpath,newpath,cb);

MIME类型：
html:text/html
jpg:image/jpg

```

#### 1.1接收get

* 【quertstring】把查询的字符串转成对象
```
querystring.parse("foo=bar&abc=xyz&abc=123")

{
  foo: 'bar',
  abc: ['xyz', '123']
}
```
 
* 【url】路径的解析
```
url.parse(req.url,true);  
可得到host port query true后面就可以把查询的部分变为对象。
```

* 【path】路径的解析
```
path.extname(url); 
```

#### 1.2接收post

##### 一般接收
* post的请求参数是在 **请求报文的体** 里面；post请求是以片段字符串的形式进行接收数据,一个小段一个小段的接收，异步的。这时node的事件环机制会给其他用户服务。
```
var all_str = '';
req.on('data'.function(str){
 all_str+=str;
});

req.on('end'.function(str){
 console.log(all_str.toSting());
 querystring.parse(all_str.toSting());
});

```

##### 接收文件

```
var formidable = require('formidable')

http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    //初始化
    var form = new formidable.IncomingForm();

    //设置一个上传路径
    form.uploadDir = "/my/dir";
 
    form.parse(req, function(err, fields, files) { 
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end('right');
    });
 
    return;
  }

  // 页面表单前端设置enctype="multipart/form-data"，前端要注意。
  <form action="/upload" enctype="multipart/form-data" method="post">

}).listen(8080);
```

--------------------------------------

### 原生node服务

* 还是不要MVC，不要EJS，前后端对应模块开发。node提供静态资源和api服务。

##### 1.路由: 静态or api?
* 入口启动服务后，判断请求的方式，决定是静态服务还是api
```
_init_server: function() {
  var key = null;
  http.createServer(function(req, res) {

    key = req.method.toLowerCase();

    switch (key) {
      // static
      case "get":
        me._static(req, res);
        break;
        // api
      case "post":
        me._api(req, res);
        break;
    }
  }).listen(1010);

  console.log('server running at 1010');
},
```

##### 2.静态

```
// 静态资源
_static: function(req, res) {
  //  图标
  if (req.url == '/favicon.ico') {
    res.end();
    return;
  }
  // 主页
  if (req.url == '' || req.url == '/') {
    req.url = '/index.html';
  }

  // 
  me._static_file(req.url)
    .then(function(data) {
      res.writeHead(200, { 'Content-Type': me.conf.mine[path.extname(req.url)] });
      res.end(data);
    });
},
```

##### 3.api

* api都是post请求解析
```
// post的参数处理
_api_post: function(req, res) {
  var post_obj = '';
  return new Promise(function(resovle, reject) {
    req.on('data', function(str) {
      post_obj += str;
    });
    req.on('end', function() {
      post_obj = querystring.parse(post_obj.toString());
      【学express，把body挂载到body上】
      req.body = post_obj;

      resovle();
    });
  });
},
```

* post路由设计：原生的地方需要先进行判断，原因是express那因为是有next参数的中间件，所以可以不用判断，直接写。这里不行，这里还得是有标识。
```
// 根据路径判断是什么
_api: function(req, res) {
  me._api_post(req, res)
    .then(function() {

      【路由设计：标识】
      if (req.url.indexOf("js_demo") != -1) {
        【引入和前端功能模块相对的模块】
        var js_demo = require('./modules/js_demo.js');
        new js_demo(req, res).init();
      }
    });
},
```

* api模块：各模块管各模块的API
```
init: function() {
  var me = this;
  【路由设计】
  switch (me.req.url) {
    case "/api/js_demo/font.do":
      me._font();
      break;
  }
},
_font: function() {
  var size = Math.floor(Math.random() * 200);
  if (size < 60) {
    size = 60;
  }
  var color = Math.floor(Math.random() * 1000000);

  【原生的的res只能传string，前端会解析为对象】
  me.res.end(JSON.stringify({
    size: size,
    color: color,
  }));
},
```

* 老师的课程安排是写一个相册，其实相册的难度比这个大，而且学不到什么知识。应该就是这样，写个静态服务，通过前端进行请求。前后分离且模块对应。
* 这样就能更好理解express的设计理念：EXPRESS的哲学是在你的想法和服务器之间充当薄薄的一层。这并不意味着他不够健壮，或者没有足够的有用特性，而是尽量少干预你，让你充分表达自己的思想，同时提供一些有用的东西。
* 这个demo的写法是再次复习时，根据demo-12的思想重写的。
* demo-04也可提现。