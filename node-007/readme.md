# mongoDB node版本

### 基本使用

* 下载
```
npm install mongodb
```

* 这里是DB在node端作为用户端向mongoDB数据库发出请求，有响应，是个回调。使用：
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


### DAO封装

* DAO：data access object数据访问对象，就是把数据库的操作和业务分开，专注于数据库的业务。

```
//这个模块里面封装了所有对数据库的常用操作
var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings.js");
//不管数据库什么操作，都是先连接数据库，所以我们可以把连接数据库
//封装成为内部函数
function _connectDB(callback) {
  var url = settings.dburl; //从settings文件中，都数据库地址
  //连接数据库
  MongoClient.connect(url, function(err, db) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(err, db);
  });
}

//插入数据
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


### 新增

* insertOne
```
db
  .collection(collectionName)
  .insertOne(json, function(err, result) {
    callback(err, result);
    db.close(); //关闭数据库
  });
```

### 查找

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
               .sort(sort);

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

### 修改

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

### 删除

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

### 读取总数

```
db
  .collection(collectionName)
  .count({})
  .then(function(count) {
      callback(count);
      db.close();
  });
```


### 数据库地址配置项

```
module.exports = {
    "dburl" : "mongodb://localhost:27017/haha"
}
```

* 这个数据库haha其实就是我们项目下的数据库。
* 每个api模块对应的数据库里的一个集合的名字，可以在这个api模块上进行全局配置集合的名称！

### 项目

* 数据唯一ID：index的包装
```
var ObjectId = require('mongodb').ObjectID;

{"_id":ObjectId(id)}
```

* 重定向
```
res.redirect("/");
```
