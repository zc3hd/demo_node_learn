var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser')


// 提供静态文件
app.use(express.static(path.join(__dirname, '../webapp/')));

// post
app.use(bodyParser.urlencoded({ extended: false }))

// api
var demo_1 = require('./moudles/demo_1/index.js');
new demo_1(app).init();


app.listen(1010);
console.log('server running at 1010');
