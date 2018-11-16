var express = require("express");
var app = express();
var path = require('path');



// 文件这个东西还是找绝对路径哇
app.use(express.static(path.join(__dirname,"../webapp/")));

// js_demo_api
var js_demo = require('./js_demo/index.js');
new js_demo(app).init();

 
app.listen(1010);