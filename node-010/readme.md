# mongoose step_2

* 往后学习发现还是不一样的，不是我想象的那么简单，首先mongoose实例化的对象有很多自己的方法，这个就不一样了，无形中不用自己封装了，也不用操作db。

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

* 这里不需要引出db,没有定义schema = new mongoose.schema({})
* 其实这里就是省了一个是schema是通过new mongoose.schema({})创建的。这里的定义的schema就是个定位的文档模型。
```
【step_2】
var mongoose = require('mongoose');
//创建一个数据库连接
mongoose.connect('mongodb://localhost/test');

//创建一个Cat模型。 语法mongosse.model(模型名字，Schema);
//这里省略了一步，就是schema是通过new mongoose.schema({})创建的。
var Cat = mongoose.model('Cat', { name: String , age : Number , sex : String });
```

--------------------------------

### 1.定义 文档模型-->模型-->实例 的过程

* 按道理先有一个文档模型，我自己理解就是实例模型

* 文档模型绑定集合标示后就是model（模型）：
```
var Cat = mongoose.model('Cat', { name: String , age : Number , sex : String });
```

* 模型实例化，实例化后得到实例（文档、对象），对象有方法。
```
//实例化，实例化的时候，new Cat(数值)
var kitty = new Cat({ name: "汤姆"  , "sex" : "公猫"});
//保存
kitty.save(function (err) {
    console.log('meow');
});
```

* 模型也有自己的方法，模型的方法找到的肯定都是实例，因为它是从Cat集合中find出来的。
```
//寻找汤姆猫，将它改为8岁。
Cat.find({"name":"汤姆"},function(err,result){
   var xiaomao = result[0]; 
    xiaomao.age = 8;
    xiaomao.save();
});
```

### 2.定义 文档模型的方法-->实例上的方法

* 定义文档（实例、对象）模型上的方法：
```
//博客的结构
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
【实例方法】
blogSchema.methods.showInfo = function(){
    console.log(this.title);
}
var Blog = mongoose.model('Blog', blogSchema);
```
* 定义的这个方法内部的this,就是被实例化后的对象，里面有所有的属性和方法。这里是得到实例化的属性。
* **感觉和构造函数那一套一模一样啊，这里就是多次实例，多次调用。**

---------

* 实例化模型--->实例（文档、对象），实例上就有这个方法：
```
var blog = new Blog({
    "title" : "博客测试",
    "author" : "考拉"
});
//blog.save();
blog.showInfo();
```


### 3.模型上的方法-->得到实例(文档、对象)  实例上有新定义的方法

```
//博客的结构
var animalSchema = new mongoose.Schema({
    "name" : String,
    "type" : String
});

animalSchema.methods.zhaotonglei = function(callback){
    this.model('Animal').find({"type":this.type},callback);
}

var Animal = mongoose.model('Animal', animalSchema);

//Animal.create({"name":"汤姆","type":"猫"});
//Animal.create({"name":"咪咪","type":"猫"});
//Animal.create({"name":"小白","type":"狗"});
//Animal.create({"name":"snoopy","type":"狗"});

Animal.findOne({"name":"小白"},function(err,result){
    var dog = result;
    dog.zhaotonglei(function(err,result){
        console.log(result);
    });
});
```

* 这里可以看到文档模型上的方法中的this,通过this.model('Animal')找到模型。那么找到模型后又能用模型上的方法。

### 4.文档模型上的  {属性：类型}

* comments的属性就是指定内部元素的 {属性：类型} 
```
var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }]
});
blogSchema.methods.pinglun = function(obj,callback){
    this.comments.push(obj);
    this.save();
}
var Blog = mongoose.model('Blog', blogSchema);
Blog.findOne({"title":"哈哈哈"},function(err,blog){
    if(!blog){
        return;
    }
    【直接调用添加的犯法即可】
    blog.pinglun({"body":"再来一个评论","date" : new Date()});
});
```

* 支持的类型和方式：
```
var schema = new Schema({
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

  comments: [{ body: String, date: Date }],
})
```
* 有个Schema.Types.ObjectId相当于是可以进行外键的关联，但是这里的说法是叫聚合，就是留个ID，可以找到真正这个对象。

### 5.文档模型方法和 模型方法

* 首先--文档模型得到的实例--和--模型--都有自己的方法。就是mongoose内置封装好的方法。

* 【文档模型方法】通过this可以找到自己的属性和内置方法或新定义法。和面向对象一模一样，能拿到所有的属性和方法。
* 也可以通过this.model('Animal')找到模型（其实就是绑定集合标示的模型），然后就可以使用模型上的方法。

```
blogSchema.methods.pinglun = function(obj,callback){
    【能拿到所有的属性和方法】
    this.comments.push(obj);
    this.save();
    this.pinglun({"body":"再来一个评论","date" : new Date()});

    【找到模型（其实就是绑定集合标示的模型）】
    this.model('Animal').find({"type":this.type},callback);
}
```

* 【模型方法】内部找到就是个实例（对象、文档），也具有上面说的那些。
* 只能通过模型进行调用
* 模型上的方法，【静态方法】里面的this只的应该就是模型本身吧？！
```
doc_Schema.statics.fn = function(kidarray,sid,callback){
    console.log(this);
}
```
