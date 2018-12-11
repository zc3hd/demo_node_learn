### Express

* EXPRESS的哲学是在你的想法和服务器之间充当薄薄的一层。这并不意味着他不够健壮，或者没有足够的有用特性，而是尽量少干预你，让你充分表达自己的思想，同时提供一些有用的东西。

```
npm install express --save
```

##### 快速服务和路由设计
```
var express = require("express");
var app = express();


app.get("/",function(req,res){
    res.send("你好");
});

【无视路由的】
app.get("/HAha",function(req,res){
    res.send("这是haha页面，哈哈哈哈哈哈");
});

app.get("/teacher/:gonghao",function(req,res){
    res.send("老师信息，工号" + req.params.gonghao);


    res.write("xxx");
    res.end(oid);
});

app.listen(3000);
```

##### 静态文件服务

```
app.use(express.static("./public"));
```

##### 路由的顺序和next

* 这两个路由，下面的路由永远不会被激发
```
app.get("/:username/:id",function(req,res){
    console.log("1");
    res.send("用户信息" + req.params.username);
});

app.get("/admin/login",function(req,res){
    console.log("2");
    res.send("管理员登录");
});
```

* 解决方式1：就是把下面的放在上面，越具体越上面放
* 解决方法2:就是加入next参数
```
app.get("/:username/:id",function(req,res,next){
    var username = req.params.username;
    //检索数据库，如果username不存在，那么next()
    if(检索数据库){
        console.log("1");
        res.send("用户信息");
    }else{
        next();
    }
});

app.get("/admin/login",function(req,res){
    console.log("2");
    res.send("管理员登录");
});
```

##### app.use(fn) fn是中间件

* 这里引出了中间件，我们前面的get,post,use表现为一个路由，接着后面的fn就是一个中间件。
* 中间件很注意顺序，所以有next进行配合
* use后面的路由都可以匹配到浏览器的任何访问的地址，当前面的"/admin"都不写的话，相当于是"/",全部路由。事实上，app.use()都是第三方提供的包。
```
app.use("/admin",function(req,res){
    res.write(req.originalUrl + "\n");
    res.write(req.baseUrl + "\n");
    res.write(req.path + "\n");
    res.end("你好");
});
```

* 用app.use()写一个类似静态服务的中间件
```
app.use(haha);
function haha(req,res,next){
    var filePath = req.originalUrl;
    //根据当前的网址，读取public文件夹中的文件
    //如果有这个文件，那么渲染这个文件
    //如果没有这个文件，那么next();
    fs.readFile("./public/" + filePath,function(err,data){
        if(err){
            //文件不存在
            next();
            return;
        }
        res.send(data.toString());
    });
}
```

* 所以就理解回到express提供的静态服务：app.use(express.static("./public"));其实里面是对res,req,next的封装。
* 所以静态服务，写一个专门的路由进入，前端无任何变化，加上前面的路径就是浏览器需要加上这个路径
```
app.use("/jingtai",express.static("./public"));
```

* 404：同样404就是任何找不到的路由采用一个中间件
```
app.use(function(req,res){
    res.status(404).send("没有这个页面！");
});
```

##### app.get()/app.post()

* get请求找请求的参数用 req.query
* post需要使用body-parser，在req.body得到参数，文件上传使用formidable

```
【bodyParser@1.14.0】
var bodyParser = require('body-parser')

【这个老师教的有误，这是对urlencoded进行解码】
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/",function(req,res){
    console.log(req.body);
});
```

### express服务项目（对应demo-03的项目思想）

* 自己使用，绝不会使用ejs模板引擎，前后端分离，node只是提供后台的路由API功能。
* 项目的目录：目标是为了和vue-webpack-express前后一起开发，现在把demo-webpack-003中vue打包后的webapp全部拿过来。

##### 1.工程目录：
```
webapp 【里面就是各个模块的文件】
 - js_demo 【api写在内部】

api_server:
 -app.js 【server的入口脚本】
 - js_demo: 【专门给webapp里js_demo提供api服务。理念和webapp下模块一样，api写在内部进行管理，不要什么MVC】
```

##### 2.静态资源和api引入：
* app.js里面主要是提供静态资源服务，引入api模块，启动服务。
```
var express = require("express");
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname,"../webapp/")));

// api
var js_demo = require('./js_demo/index.js');
new js_demo(app).init();

 
app.listen(1010);
```

##### 3.api模块：
* api模块文件在app.js使用，向外暴露一个构造函数：
```
api_server/js_demo/index.js:

function JS_demo(app) {
  var me = this;
  me.app = app;
}
JS_demo.prototype = {
  init: function() {
    var me = this;

    // 实时数据
    me.app.post('/api/time_data.do', function(req, res) {
        me._data_time(req, res);
    });
  },
  _data_time: function(req, res) {
    var me = this;
    me.obj = {};
    res.send(me.obj);
  },
};
module.exports = JS_demo;
```

* 写到这的时候，这和demo-03完全对应。是不是express让业务更专注？

-----------------------

### 问题1：
* 【?】gulp+express 如何搭建?
* 答：见下面的demo-05。对比demo-03/04学习。

### 问题2：
* 【?】webpack+express 如何搭建?
* 答：demo-012

