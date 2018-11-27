var fs = require('fs');
var http = require('http');
var path = require('path');
var querystring = require('querystring');

function All(argument) {
  var me = this;

  me.conf = {
    static: '../webapp/',
    mine: null,

    str: '',
  };
}
All.prototype = {
  _init: function() {
    var me = this;
    me._bind();
    // 
    me._static_file_mine()
      .then(function() {
        me._init_server();
      });
  },
  _bind: function() {
    var me = this;
    var fns = {

      // 创建服务器
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

      // ============================================静态资源
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
      // 读取类型文件
      _static_file_mine: function() {
        return new Promise(function(resovle, reject) {
          fs.readFile(path.join(__dirname, '../mime.json'), (err, data) => {
            if (err) throw err;
            me.conf.mine = JSON.parse(data.toString());
            resovle();
          });
        });
      },
      // 读取文件
      _static_file: function(file_url) {
        return new Promise(function(resovle, reject) {
          fs.readFile(path.join(__dirname, me.conf.static, file_url), (err, data) => {
            if (err) throw err;

            resovle(data.toString());
          });
        });
      },


      // ============================================API
      // 根据路径判断是什么
      _api: function(req, res) {
        me._api_post(req, res)
          .then(function() {


            // express那因为是有next参数的中间件，所以可以不用判断，直接写
            // 这里不行，这里还得是有标识。

            // 这里就进行路由设计
            if (req.url.indexOf("js_demo") != -1) {
              var js_demo = require('./modules/js_demo.js');
              new js_demo(req, res).init();
            }
          });
      },
      // post的参数处理
      _api_post: function(req, res) {
        var post_obj = '';
        return new Promise(function(resovle, reject) {
          req.on('data', function(str) {
            post_obj += str;
          });
          req.on('end', function() {
            post_obj = querystring.parse(post_obj.toString());
            req.body = post_obj;

            resovle();
          });
        });
      },

    };
    for (var key in fns) {
      me[key] = fns[key];
    }
  },
};





new All()._init();
