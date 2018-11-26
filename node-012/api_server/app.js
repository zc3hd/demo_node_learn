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



