function Data() {
  var me = this;
  var mongodb = require('mongodb');
  // 用于连接数据库
  me.MongoClient = mongodb.MongoClient;
  // 包装ID
  me.ObjectId = mongodb.ObjectID;
}
Data.prototype = {
  // 连接数据库
  _connect: function() {
    var me = this;
    return new Promise(function(resolve, reject) {
      me.MongoClient
        .connect('mongodb://localhost:27017/test', function(err, db) {
          resolve(db);
        });
    });
  },
    // 新增
  add: function(collection_name, obj) {
    var me = this;
    return new Promise(function(resolve, reject) {
      me._connect()
        .then(function(db) {
          db
            .collection(collection_name)
            .insertOne(obj, function(err, result) {

              resolve(result);
              db.close();
            });
        });
    });
  },


  // 查找所有
  list: function(collection_name, obj) {
    var me = this;
    var cursor = null;
    var arr = [];
    return new Promise(function(resolve, reject) {
      me._connect()
        .then(function(db) {

          cursor = db
            .collection(collection_name)
            .find(obj)
            .sort({ "_id": -1 });
          // cursor.forEach(function(ele, index) {
          //   // console.log(ele);
          //   arr.push(doc);
          // });
          // resolve(arr);
          // db.close();
          // return;
          cursor.each(function(err, doc) {

            if (doc != null) {
              arr.push(doc);
            } 
            // 
            else {
              resolve(arr);
              db.close();
            }
          });

        });
    });
  },

  // 修改
  edit: function(collection_name, obj_id, obj) {
    var me = this;
    return new Promise(function(resolve, reject) {
      me._connect()
        .then(function(db) {
          db
            .collection(collection_name)
            .updateMany(
              // 查找的数据
              { "_id": me.ObjectId(obj_id._id) },
              // 要改的数据
              { $set: obj },
              // cb
              function(err, result) {

                resolve(result);
                db.close();
              });
        });
    });
  },

  // 
  del: function(collection_name, obj_id) {
    var me = this;
    return new Promise(function(resolve, reject) {
      me._connect()
        .then(function(db) {
          db
            .collection(collection_name)
            .deleteMany(
              // 查找的数据
              { "_id": me.ObjectId(obj_id._id) },
              // cb
              function(err, result) {

                resolve(result);
                db.close();
              });
        });
    });
  },

  count: function(collection_name) {
    var me = this;
    return new Promise(function(resolve, reject) {
      me._connect()
        .then(function(db) {
          db
            .collection(collection_name)
            .count({})
            .then(function(count) {
            	// 
              resolve({count:count});
              db.close();
            });
        });
    });
  },
};


module.exports = Data;
