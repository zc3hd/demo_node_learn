var fs = require('fs');
var http = require('http');
var path = require('path');
var querystring = require('querystring');

function All(argument) {
  var me = this;

  me.conf = {
    static: './webapp/',
    mine: null,

    str: '',
  };
}
All.prototype = {
  _init: function() {
    var me = this;
    me._bind();
    // 
    me._read_json(function() {
      me._init_server();
    });
  },
  _bind: function() {
    var me = this;
    var fns = {
      // 读取类型文件
      _read_json: function(cb) {
        fs.readFile(path.join(__dirname, './mime.json'), (err, data) => {
          if (err) throw err;
          me.conf.mine = JSON.parse(data.toString());
          cb && cb();
        });
      },
      // 创建服务器
      _init_server: function() {
        var server = http.createServer(function(req, res) {

          // 图标
          if (req.url == '/favicon.ico') {
            res.end();
            return;
          }


          // 主页
          if (req.url == '' || req.url == '/') {
            req.url = '/index.html';
          }
          var extname = path.extname(req.url);
          // api
          if (extname == '.do') {
            me._api(req, res);
          }
          // 文件
          else if (extname != '') {
            fs.readFile(path.join(__dirname, me.conf.static, req.url), (err, data) => {
              if (err) throw err;
              res.writeHead(200, { 'Content-Type': me.conf.mine[extname] });
              res.end(data.toString());
            });
          }
          // 其他路径
          else {
            fs.readFile(path.join(__dirname, me.conf.static, '404.html'), (err, data) => {
              if (err) throw err;
              res.writeHead(200, { 'Content-Type': "text/html" });
              res.end(data.toString());
            });
          }


          // 


        });


        server.listen(1234);
      },

      // 根据路径判断是什么
      _api: function(req, res) {
        var all_str = '';
        req.on('data', function(str) {
          all_str += str;
        });
        req.on('end', function(str) {
          all_str = querystring.parse(all_str.toString());
          // 读取文件加载
          me._read_dir(all_str.pathname, res);
        });
      },
      // 读取文件夹下面的数据
      _read_dir: function(_path, res) {
        var arr = [];

        fs.readdir(path.join(__dirname, me.conf.static, _path), function(err, files) {
          // console.log(files);
          files.forEach(function(ele, index) {
            // 文件
            if (path.extname(ele) != '') {
              arr.push({
                key: 0,
                name: ele,
                url: path.join(_path, ele),
              });
            }
            // dir
            else {
              arr.push({
                key: 1,
                name: ele,
                url: path.join(_path, ele),
              });
            }
          });
          res.end(JSON.stringify(arr));
        });
      },
    };
    for (var key in fns) {
      me[key] = fns[key];
    }
  },

};





new All()._init();
