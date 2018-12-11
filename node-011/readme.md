# mongoose step3

```
npm i mongoose@5.3.13 -D
```

* 最新版本的API更明朗
* 项目是按照node-007改的，使用下来就一个感觉，比自己封装的DAO层还是有点优势的。

-------

* 1.我都是把api路由的定义写在api模块内部，使用mongoose定义的模型，相当于是绑定集合后的【model模型】，直接被引过来。【model模型】上有封装好的方法。
* 2.一般情况下不需要重新定义【model模型】方法（静态方法）(static.fn)。也不需要重新定义 【实例】方法（methods.fn）。
* 3.无论是【model模型】方法，还是【实例】方法，都支持promise写法。

##### 1.【model模型】方法：

```
Model.create(doc(s), [callback])

var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
Movies.insertMany(arr, function(error, docs) {});
```

```
Model
.update({ "sid": sid }, req.query, function() {
   res.send("修改成功");
});
Model
  .findById(req.body._id)
  // 和官方不一样啊，这里前面是doc
  .then(function(doc, err) {

    // 实例方法也是promise
    doc.save()
      .then(function(result) {
        res.send(result);
      })

  });
```

```
Model 
  .deleteOne(req.body)
  .remove(req.body)
  .then(function(result) {
    res.send({});
  });

```

```
Model.findOne([conditions], [projection], [options], [callback])
Model.findById(id, [projection], [options], [callback])
Model.find()
  .gt('age', 21)
  .limit(20)
  .skip(20)
  .sort({_id:-1})
  .then()
```

```
Model.countDocuments(conditions, [callback])
```

##### 2.模型方法：
```
【定义主键】
schema.index({ first: 1, last: -1 })
studentSchema.index({ "sid": 1});
```

### 关联/聚合

##### 1.单集合的关联和聚合
* 关联
```
var doc_model = new mongoose.Schema({
  title: String,
  body: String,
  【数组类型，里面是每个ID】
  users: [{
    【指定类型】
    type: mongoose.Schema.Types.ObjectId,
    【指定关联的哪个集合，就是定义的集合标示  var model_key = 'user';】
    ref: 'user'
  }]
});
```

* 聚合，就是把关联的进行查询出来
```
me.Book_model
      .find()
      .populate({
        【进行查询哪个字段是关联了，然后进行查询】
        path: "users",

        【选择被关联集合的文档的属性，选择要哪些属性】
        select: 'name',

        【这些属性中，匹配上下面的规则的提出来】
        match: { name: 'name_1' },

        【被查的文档中，指定哪个字段进行排列文档】
        options: { sort: { name: -1 } }
      })
      .sort({ "_id": -1 })
      .then(function(result) {
        res.send(result);
      });
```
* 关联聚合的好处就是你拿我一个标识，你可以通过标识查我的数据，
* 如果我的数据删除了，你也就查不到我的数据了，很及时的联动。

##### 2.多集合的关联和聚合

* 关联
```
// 文档模型
var doc_model = new mongoose.Schema({
  title: String,
  body: String,
  // 
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  // 标签
  labels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'label'
  }],

});
```

* 多集合聚合
```
me.Book_model
  .find()
  .populate({
    // 指定查询哪个字段进行了关联
    path: "users",
    // 选择被关联集合的文档的属性
    select: 'name',
    // 
    // match: { name: 'name_1' },
    // 被查的数据中，指定哪个字段的排列方式
    options: { sort: { name: 1 } }
  })
  .populate({
    // 指定查询哪个字段进行了关联
    path: "labels",
    // 选择被关联集合的文档的属性
    select: 'label',
    // 
    // match: { name: 'name_1' },
    // 被查的数据中，指定哪个字段的排列方式
    // options: { sort: { label: 1 } }
  })
  .sort({ "_id": -1 })
  .then(function(result) {
    res.send(result);
  });
```

* 多个promise的调用
```
    me.User_model
      .find()
      .then(function(result) {
        return me.Label_model.find();
      })
      .then(function(result) {
        return me.Book_model.create(req.body);
      })
      .then(function(result) {
        res.send(result);
      });
```

##### 3.设置字段属性的唯一性
* 比如要求用户名不能重复
```
var mongoose = require('mongoose');
var model_key = 'demo';

// 文档模型
var doc_model = new mongoose.Schema({
  info: { type: String, unique: true },
});
// 模型
module.exports = mongoose.model(model_key, doc_model);


var schema2 = new Schema({
  test: {
    type: String,
    【是否定位为索引】
    index: true,

    【是否定位为唯一索引】
    unique: true 
  }
});

```

```
me.Demo_model
  .create({ info: "a" })
  .then(function(result) {
    // console.log(result);
  });

me.Demo_model
  .on('index', function(err) {
    if (err) console.log(err);
  });
```


---------------------------------

### Router的设计

* 在api服务的模块中这样使用：
```
me.app = app;
me.router = require('express').Router();

me.router.post('/add.do', function(req, res) {
  me._api_add(req, res);
});

me.app.use('/api/book',me.router);
```

### 全局参数配置

```
module.exports = {
  // 数据库名称
  db:"test",

  // 测试模式下的端口
  dev_port:1011,

  // 打包后/测试时被代理的端口
  api_port:1010,
}
```

* 至此，基本上就可以了做前后的项目。

