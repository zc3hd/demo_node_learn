# mongoDB node版本

### 基本使用

* 下载
```
npm install mongodb@2.0.43
```

* 这里是DB在node端，作为用户端向mongoDB数据库发出请求，有响应，是个回调。使用：
```
var MongoClient = require('mongodb').MongoClient;

app.get("/",function(req,res){
    //url就是数据库的地址。/表示数据库
    //假如数据库不存在，没有关系，程序会帮你自动创建一个数据库
    var url = 'mongodb://localhost:27017/haha';
    
    //连接数据库
    MongoClient.connect(url, function(err, db) {
        
        //插入数据，集合如果不存在，也没有关系，程序会帮你创建
        db.collection('student').insertOne({
            "name" : "哈哈",
            "age" : parseInt(Math.random() * 100 + 10)
        }, function(err, result) {

            //插入之后做的事情，result表示插入结果。
            res.send(result);
            db.close();
        });

    });
});
```


### DAO封装（老师）

* DAO：data access object 【数据访问对象】
* 把数据库的业务和【api】业务分开，专注于数据库的业务。
* 不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库，封装成为内部函数。
```
var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");

function _connectDB(callback) {
  【从settings文件中，都数据库地址】
  var url = settings.dburl;

  MongoClient.connect(url, function(err, db) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(err, db);
  });
}

exports.insertOne = function(collectionName, json, callback) {
  _connectDB(function(err, db) {
    db
      .collection(collectionName)
      .insertOne(json, function(err, result) {
        callback(err, result);
        db.close(); //关闭数据库
      })
  })
};
```

### db.api
##### 1.insertOne

```
db
  .collection(collectionName)
  .insertOne(json, function(err, result) {
    callback(err, result);
    db.close(); //关闭数据库
  });
```

##### 2.find

* 查询条件和shell版一毛一样。
* 分页、排序、游标
```
【游标】
var result = []; //结果数组

var cursor = db
               .collection(collectionName)
               .find(json)
               .skip(skipnumber)【跳过多少】
               .limit(limit)【读取多少】
               .sort({"key_1":1,"key_2":-1});

【查到的游标结果进行遍历】
cursor.each(function(err, doc) {
  if (err) {
    callback(err, null);
    db.close(); //关闭数据库
    return;
  }
  if (doc != null) {
    result.push(doc); //放入结果数组
  } 
  else {
    //遍历结束，没有更多的文档了
    callback(null, result);
    db.close(); //关闭数据库
  }
});

```

##### 3.updateMany

```
db
  .collection(collectionName)
  .updateMany(
    json1,
    json2,
    function (err, results) {
        callback(err, results);
        db.close();
  });


使用：
  {
    "borough":"Manhattan"       //改什么
  },
  {
    $set: { borough: "北京" }     //怎么改
  },
```

##### 4.deleteMany

```
db
  .collection(collectionName)
  .deleteMany(
    json,
    function (err, results) {
      callback(err, results);
      db.close();
    }
  );
```

##### 5.count({})

```
db
  .collection(collectionName)
  .count({})
  .then(function(count) {
      callback(count);
      db.close();
  });
```

##### 6.index索引

* 初始化的时候执行一次就行,用法就是保证那个字段不能重复吧。
```
db.collection('student').createIndex(
  { "name": 1 },
  {unique: true},

  function(err, results) {
    console.log(results);
    callback();
  }
);
```

##### 没有外键，叫聚合

* 一个表的数据的一个字段，链接着另外一个表的一条数据。

##### 数据库地址配置项
* 这个数据库test其实就是我们目录下，项目的数据库。
```
【这就是选择了数据库（已经是开机在某个具体的文件夹路径，里面是好多数据库）】
module.exports = {
    "dburl" : "mongodb://localhost:27017/test"
}
```



---------------------



### DAO封装（自己）

* 数据唯一ID的包装
```
var ObjectId = require('mongodb').ObjectID;
{"_id":ObjectId(id)}
```

* 重定向
```
res.redirect("/");
```

* 注意各使用的版本号
```
"body-parser": "^1.14.0",
"express": "^4.16.4",
"mongodb": "^2.0.43"
```

* 其实到了这最重要的就是DAO层的封装了。这里形成个简单的增删改查。目录结构：
```
-api_server
  -moudules
     -demo_1
   -scripts
     --db.js

_webapp
  -moudules
     -demo_1
   -scripts
```

#### 1. db.js【dao层的封装】面向对象写法
```
function Data() {
  var me = this;
  var mongodb = require('mongodb');
}
Data.prototype = {};
module.exports = Data;
```

#### 2. dao层 在api模块中调用：
```
var Data = require('../../scripts/db.js');

function JS_demo(app) {
  var me = this;
  me.app = app;
  
  【被调用封装的db，挂载全局】
  me.data = new Data();
}
JS_demo.prototype = {};

【api模块输出】
module.exports = JS_demo;
```

#### 3.db.js【dao层的封装】连接、增删改查promise的封装
```
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
```

#### 4. api模块的路由设计和调用DAO层的函数

```
  init: function() {
    var me = this;

    【设计路由】
    me.app.post('/api/demo_1/add.do', function(req, res) {
      me._api_add(req, res);
    });
  },
  【回调函数里直接使用】
  _api_add: function(req, res) {
    var me = this;
    me.data
      .add("json_arr", {
        name: req.body.name,
        info: req.body.age,
      })
      .then(function(result) {
        res.send(result);
      });
  },
```

* 查找全部数据的时候，得到游标cursor，需要each遍历，不是forEach

```
cursor.each(function(err, doc) {
  if (doc != null) {
    arr.push(doc);
  } else {
    resolve(arr);
    db.close();
  }
});
```
