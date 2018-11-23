var Data = require('../../scripts/db.js');

function JS_demo(app) {
  var me = this;
  me.app = app;

  me.data = new Data();
}
JS_demo.prototype = {
  init: function() {
    var me = this;

    // add
    me.app.post('/api/demo_1/add.do', function(req, res) {
      me._api_add(req, res);
    });

    // list
    me.app.post('/api/demo_1/list.do', function(req, res) {
      me._api_list(req, res);
    });

    // edit
    me.app.post('/api/demo_1/edit.do', function(req, res) {
      me._api_edit(req, res);
    });

    // del
    me.app.post('/api/demo_1/del.do', function(req, res) {
      me._api_del(req, res);
    });

    // del
    me.app.post('/api/demo_1/count.do', function(req, res) {
      me._api_count(req, res);
    });



  },
  _api_count:function (req, res) {
    var me = this;
    me.data
      .count("json_arr")
      .then(function(result) {
        // 不能直接传数字
        res.send(result);
      });
  },


  _api_del:function (req, res) {
    var me = this;
    me.data
      .del("json_arr", req.body)
      .then(function(result) {
        res.send(result);
      });
  },
  _api_edit: function(req, res) {
    var me = this;
    var obj_id = {
      _id: req.body._id,
    };
    var obj = {
      name: "edit_name_" + Math.floor(Math.random() * 100),
      info: "edit_age_" + Math.floor(Math.random() * 100),
    }
    me.data
      .edit("json_arr", obj_id, obj)
      .then(function(result) {
        // console.log(result);
        res.send(result);
      });
  },

  _api_add: function(req, res) {
    var me = this;


    // console.log();
    // *********************************************模拟数据
    // me.obj = {
    //    left: Math.floor(Math.random() * 100),
    //    top: Math.floor(Math.random() * 100),

    //    width: Math.floor(Math.random() * 100),
    //    height: Math.floor(Math.random() * 100),

    //    radius:Math.floor(Math.random() * 100),


    //    bgc: 100000 + Math.floor(Math.random() * 900000),

    //    size: 20 + Math.floor(Math.random() * 100),
    //  };

    //  if ((me.obj.left + me.obj.width) > 100) {
    //    me.obj.left = 100 - me.obj.width;
    //  }

    //  if ((me.obj.top + me.obj.height) > 100) {
    //    me.obj.top = 100 - me.obj.height;
    //  }
    // *********************************************模拟数据
    me.data
      .add("json_arr", {
        name: req.body.name,
        info: req.body.age,
      })
      .then(function(result) {
        // console.log(result);
        res.send(result);
      });


    // me.obj = {};
  },

  // 查找所有数据
  _api_list: function(req, res) {
    var me = this;
    me.data
      .list("json_arr", {})
      .then(function(result) {
        res.send(result);
      });
  },

};



module.exports = JS_demo;
