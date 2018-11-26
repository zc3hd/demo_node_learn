# webpack + express

### 1.说明

* 解决node-4最后提出的问题：前端用webpack进行测试和build，后台用express提供服务。怎么产生一个工具。

### 2.开始 JS_demo

* **前端：**
* 可能是没有复习webpack或实战，webpack测试的时候的HTML里不需要引入自己写的index.css和index.js。less要被引入js内部。
* 这个有点不习惯，因为gulp是对打包后的模块进行静态资源提供服务，所以就需要前期在HTML内部把JS和css都引入。

* **node：**
* 前端写的业务这次就是个实时请求数据。后台也是按照前面的模块化进行构建。所以这次就没有连接到表，直接在api业务模块提供数据服务。

```
  init: function() {
    var me = this;
    me.router.post('/font.do', function(req, res) {
      me._api_font(req, res);
    });

    me.app.use('/api/js_demo', me.router);
  },
  _api_font: function(req, res) {
    var me = this;
    var size = Math.floor(Math.random() * 200);
    if (size < 60) {
      size = 60;
    }
    var color = Math.floor(Math.random() * 1000000);
    res.send({
      size:size,
      color:color,
    });
  },
```

-------------------------

* **dev模式如何提供服务**
* dev模式我们只是提供API，静态资源都不需要提供，因为会在setup函数内部使用，内有参数app。就是我们后台的app = new express(); 
* 在app.js文件内部通过环境变量判断 进行dev模式,app.js文件需要变化：

```
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// 链接数据库
mongoose.connection.once('open', function() {
  console.log('数据库已连接');
});

// post
app.use(bodyParser.urlencoded({ extended: false }))


// API
function API(app) {
  var JS_demo = require('./moudles/js_demo/index.js');
  new JS_demo(app).init();
}


// 测试模式
if (process.env.NODE_ENV == 'dev') {
  module.exports = function(app) {
    // api
    API(app);
  };
}
// build模式
else {
  // 提供静态文件
  app.use(express.static(path.join(__dirname, '../webapp/')));

  API(app);

  app.listen(1010);
  console.log("服务开启");
}
```

* dev模式下输出函数，传入外部的参数app，调用本地的API函数。

```
function API(app) {
  var JS_demo = require('./moudles/js_demo/index.js');
  new JS_demo(app).init();
}
module.exports = function(app) {
 // api
 API(app);
};
```

* webpack内的引用:
```
    setup: function(app) {
      // 这个app就是express生成的app

      require('./api_server/app.js')(app);
    },
```

* **build模式如何build后再提供服务**
* 除了app.js内部的配置有位置上的改变，其他就是package.json内部命令的改变：
```
"scripts": {
 "dev": "set NODE_ENV=dev&&node ./webpack.config.js",
 "build": "set NODE_ENV=production&&node ./webpack.config.js&&node ./api_server/app.js"
},
```

* 最后这也是demo-webpack-004最后的需要：【webpack+express】



























