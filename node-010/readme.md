# mongoose step_2

* 往后学习发现还是不一样的，不是我想象的那么简单，
* mongoose实例化的对象有很多自己的方法，这个就不一样了，无形中不用自己封装了，也不用操作db。
* 不光实例是有自己的方法，model模型上也有很多方法。

---------------------------------------------

* 和step_1很不一样的地方：
```
【step_1】
var mongoose = require('mongoose');

//创建数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/haha');

//监听open事件
db.once('open', function (callback) {
    console.log("数据库成功连接");
});

module.exports = db;

---------
var mongoose = require('mongoose');
var db = require("./db.js");

var studentSchema = new mongoose.Schema({
    name     :  {type : String},
    age      :  {type : Number},
    sex      :  {type : String}
});
var studentModel = db.model('Student', studentSchema);

module.exports = studentModel;
```

* 下面这个：省了一个是schema是通过new mongoose.schema({})创建的。
```
【step_2】
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Cat = mongoose.model('Cat', { name: String , age : Number , sex : String });
```

* **然后，上面的这些方式都没有用到，下面才是重点！**

--------------------------------

### 1.定义 【文档模型】-->【model模型】-->【实例】的过程

* 先有一个【文档（实例、对象）模型】
```
var Schema = new mongoose.Schema({
    name     :  {type : String},
    age      :  {type : Number},
    sex      :  {type : String}
});
```

* 【文档模型】 绑定集合标识后就是【model模型】：
```
var Cat = mongoose.model('Cat',Schema);
```

* 【model模型】实例化，实例化后得到【实例（文档、对象）】，【实例（文档、对象）】有自己方法：
```
var kitty = new Cat({ name: "汤姆"  , "sex" : "公猫"});
kitty.save(function (err) {
    console.log('meow');
});
```

* 【model模型】也有自己的方法，【model模型】的方法内部得到的都是【实例】，因为它是从Cat集合中find出来的。
```
Cat.find({"name":"xx"},function(err,xiaomao){
    xiaomao[0].age = 8;
    xiaomao[0].save();
});
```

### 2.定义 【实例（文档、对象）】方法

```
var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});
【实例（文档、对象）】方法：
blogSchema.methods.showInfo = function(){
    console.log(this.title);
}
var Blog = mongoose.model('Blog', blogSchema);
```
* 定义的这个方法内部的this,就是被实例化后的【实例】，里面有所有的属性和方法，感觉和构造函数一模一样。

* 调用：
```
var blog = new Blog({
    "title" : "博客测试",
    "author" : "考拉"
});
blog.showInfo();
```


### 3.【model模型】方法内得到【实例(文档、对象) 】，可用新定义的【实例】方法

```
【文档模型】
var animalSchema = new mongoose.Schema({
    "name" : String,
    "type" : String
});

【实例（文档、对象）】方法：
animalSchema.methods.zhaotonglei = function(callback){
    this.model('Animal').find({"type":this.type},callback);
}

var Animal = mongoose.model('Animal', animalSchema);

【model模型】的方法
Animal.findOne({"name":"小白"},function(err,dog){
    可以使用定义的 【实例】方法
    dog.zhaotonglei(function(err,result){
        console.log(result);
    });
});
```

*【实例】方法中的this,通过this.model('Animal')找到【model模型】。那么找到【model模型】后又能用【model模型】上的方法。

### 4.【文档模型】内的  {属性：类型}

```
var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,

    comments: [{ body: String, date: Date }] // comments的属性就是指定内部元素的 {属性：类型} 

    name:    String,
    binary:  Buffer,
    living:  Boolean,
    updated: { type: Date, default: Date.now },
    age:     { type: Number, min: 18, max: 65 },
    mixed:   Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    array:      [],
    ofString:   [String],
    ofNumber:   [Number],
    ofDates:    [Date],
    ofBuffer:   [Buffer],
    ofBoolean:  [Boolean],
    ofMixed:    [Schema.Types.Mixed],
    ofObjectId: [Schema.Types.ObjectId],
    ofArrays:   [[]],
    ofArrayOfNumbers: [[Number]],
    nested: {
      stuff: { type: String, lowercase: true, trim: true }
    }
});
```

* Schema.Types.ObjectId可以进行外键的关联，查询叫聚合，可以找到真正这个ID的对象。

### 5.【实例】方法和 【model模型】方法

* 首先【model模型】得到的【实例】和【model模型】都有自己的方法，都是是mongoose内置封装的。

##### 5.1【实例】方法
* 通过this可以找到自己的属性和内置方法或新定义方法，和面向对象一模一样，能拿到所有的属性和方法。
* 通过`this.model('Animal')`找到【model模型】（绑定集合标识的【文档模型】），然后就可以使用【model模型】上的方法。

```
blogSchema.methods.pinglun = function(obj,callback){
    //能拿到所有的属性和方法
    this.comments.push(obj);
    this.save();
    this.pinglun({"body":"再来一个评论","date" : new Date()});

    //找到【model模型】（其实就是绑定集合标识的【文档模型】）
    this.model('Animal').find({"type":this.type},callback);
}
```

##### 5.2【model模型】方法：
* 内部可得到【实例（对象、文档）】；
* 新定义的【model模型】方法叫【静态方法】；
* 【model模型】f方法、【静态方法】只能通过【model模型】进行调用；
* 里面的this只的应该就是【model模型】本身吧？
```
doc_Schema.statics.fn = function(kidarray,sid,callback){
    console.log(this);
}
```
