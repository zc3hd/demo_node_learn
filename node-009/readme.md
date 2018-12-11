# mongoose step_1

* JS对象和数据库形成的一个框架，操作对象就是就是操作数据库了。对象产生了，同时也持久化了。
* JAVA思想中的SSH中的Hibernate

```
npm i mongoose@4.1.8 -D
```

* mongoose首先要想明白一件事儿，所有的操作都不是对数据库进行的。所有的操作都是对【类】进行的。但是数据库的持久化自动完成了。

### 1.连接

* 连接，向外暴露
```
var mongoose = require('mongoose');

//创建数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/haha');

//监听open事件
db.once('open', function (callback) {
    console.log("数据库成功连接");
});

module.exports = db;
```

### 2.定义模型

* 设一个集合的模型
* 可以全局配置一个参数，设置是哪个数据库。
```
var mongoose = require('mongoose');

【这里引入，一会用】
var db = require("./db.js");

【其实】创建一个【文档模型】
var studentSchema = new mongoose.Schema({
    name     :  {type : String},
    age      :  {type : Number},
    sex      :  {type : String}
});


【静态方法】说的是静态方法，只能通过模型上使用。
studentSchema.statics.zhaoren = function(name, callback) {
    this.model('Student').find({name: name}, callback);
};
studentSchema.statics.xiugai = function(conditions,update,options,callback){
    this.model("Student").update(conditions, update, options, callback);
}

【这个其实就是绑定】绑定集合标识，成为模型。
var studentModel = db.model('Student', studentSchema);

【向外暴露】用在api_业务模块内部。
module.exports = studentModel;
```


### 3.某个api模块使用

```
var Student = require("./models/Student.js");

//用类来创建一个对象
Student.create({"name":"小红","age":13,"sex":"女"},function(error){
   console.log("保存成功");
})

//
Student.zhaoren("小明",function(err,result){
    console.log(result);
});

Student.xiugai({"name":"小明"},{$set : {"age":30}},{},function(){
    console.log("改年龄成功");
});
```

### 我的理解：
* 和demo_7比较，其实就是分业务（api模块）操作数据库的集合。没有什么。
* demo_7:因为所有操作数据库的集合的方法都写在db.js，在好多api业务模块的时候,一些专门的数据的操作可以写在db.js里。
* mongoose就是相当于单独写对应（api模块）的操作专门的集合面向对象构造函数。我感觉要和业务模块写在一起会更好点。唉~~没有什么嘛，写的那么神秘。总体感觉mongoose不如用自己DAO层数据库更省代码。