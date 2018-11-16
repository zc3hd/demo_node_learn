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

  	me.obj = {
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),

      width: Math.floor(Math.random() * 100),
      height: Math.floor(Math.random() * 100),

      radius:Math.floor(Math.random() * 100),


      bgc: 100000 + Math.floor(Math.random() * 900000),

      size: 20 + Math.floor(Math.random() * 100),
    };

    if ((me.obj.left + me.obj.width) > 100) {
      me.obj.left = 100 - me.obj.width;
    }

    if ((me.obj.top + me.obj.height) > 100) {
      me.obj.top = 100 - me.obj.height;
    }

    res.send(me.obj);
  },



};



module.exports = JS_demo;
