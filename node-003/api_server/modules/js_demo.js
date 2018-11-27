function JS_demo(req, res) {
  var me = this;
  me.req = req;
  me.res = res;
}

JS_demo.prototype = {
  init: function() {
    var me = this;
    me._bind();
    // 路由设计
    switch (me.req.url) {
      case "/api/js_demo/font.do":
        me._font();
        break;
    }

  },
  _bind: function() {
    var me = this;
    var fns = {
      _font: function() {
        var size = Math.floor(Math.random() * 200);
        if (size < 60) {
          size = 60;
        }
        var color = Math.floor(Math.random() * 1000000);

        // 原生的
        me.res.end(JSON.stringify({
          size: size,
          color: color,
        }));
      },
    };
    for (var key in fns) {
      me[key] = fns[key];
    }
  },
};


module.exports = JS_demo;
