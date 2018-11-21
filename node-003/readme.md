### 1.http

* 用户从client发出请求到服务器，经历了什么？
```
1.用户端，先是访问DNS域名服务器，找到域名对应的IP
2.请求前，包装请求报文。
3.报文：报文头和报文体。头：就是一些信息的说明；体就是我们要的东西。
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

MIME类型：
html:text/html
jpg:image/jpg

```

#### 1.1接受get请求

##### quertstring
* 把查询的字符串转成对象
```
querystring.parse("foo=bar&abc=xyz&abc=123")

{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

##### url
* 路径的解析
```
url.parse(req.url,true);  
可得到host port query....
true后面就可以把查询的部分变为对象。
```

##### path
* 路径的一些方法




#### 1.2接受post请求

##### 一般的post
* post的请求参数是在 **请求报文的体** 里面；
* node的服务器是以片段字符串的形式进行接收数据,一个小段一个小段的接受，就是异步的。所以node的事件环机制就会给别的用户进行服务。
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

##### 接受文件上传

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

```
寻找扩展名
path.extname(url);

改名和换地址
fs.rename(oldpath,newpath,cb);
```

### 2.node无web容器

* **node没有web容器**，就是node是没有静态资源的服务器，apache有web容器！
* 那是如何呈现不同的页面？
* 就是根据不同的req.url，读取不同的文件，分别不同地给响应回去。
* **才表现出不同的路径下，呈现不同的页面，这就是路由，就是地址和页面在字面是没有关系的，也不知道文件存在哪里。**
* 那其实所谓的node静态资源管理器：就是访问的所谓的文件的路径，根据路径读取相应的资源，相应的返回。
* **所以就是适合做顶层路由设计。**