# mongoDB

* 非结构性数据库，面向对象写的，无法挑战老牌数据库，NOSQL。
* SQL 数据库/表/行（就是一条条的数据，键值对）
* noSQL 数据库/集合/文档，里面存放都是JSON

### 1.安装

* win7系统需要安装补丁，KB2731284。
* 安装程序，按照到一个目录下。
* 配置环境变量：
```
MONGODB_HOME:C:\dev\mongoDB\bin
```

* 使用CMD,那么我们就能在系统的任何盘符，使用mongo命令了：
```
mongo   使用数据库
mongod  开机
mongoimport  导入数据
```

### 2.开机

```
--dbpath 就是选择数据库即将所在的文件夹。

【普通开机】
mongod --dbpath C:\dev\mongoDB_data\test

【mongoVUE 数据库开机】
mongod --storageEngine mmapv1 --dbpath C:\dev\mongoDB_data\cc_datas
```
* C:\dev\mongoDB_data\test就是所有数据库存放的位置，可以任意设置。里面的dbs，就是真正数据库的名称。

### 3.指令[shell版]

```
show dbs 
--列出所有数据库

use 数据库name
--使用 新建数据库名称

db
--查看当前数据库

show collections
--列出所有的集合

db.dropDatabase();
--删除当前数据库
```

##### 3.1 insert

```
【插入一条数据】
db.student.insert({"name":"add"})

【直接插入文档】
【文档是这样】
{"name":"xx","age":16}
{"name":"001","a":16}
{"name":"002","a":16,"b":["b-01","b-02"]}

mongoimport --db test --collection restaurants --drop --file primer-dataset.json
--db test 【往哪个数据库中导入】
--collection restaurants 【导入哪个集合】
--drop 【清除所有集合】
--file primer-dataset. 【要导入哪个本地本机】
```

##### 3.2 find()

* find()
```
【对象下的属性进行寻找】
db.student.find({"obj.key":"val"})

【多条件寻找】
db.student.find({"obj.key_1":"val_1","key_2":"val_2"})

【大于$gt，小于$lt】键值对的值中，又是一个对象，{$gt：30}
db.student.find({"obj.key_1":{$gt:30}},"key_2":"val_2"})

【或者条件寻找】寻找的条件写入 数组中。
db.student.find($or:[{"key_1":1},{"key_2":2}])

【直接找val为数组里元素的数据】
db.student.find({"arr_key":"val"})
```

* find().sort()排序
```
【先按前面的排正序，一样时，再按第二属性进行排负序】
db.student.find().sort({"key_1":1,"key_2":-1})
```

* 分页
```
db.student.find(json).skip(skipnumber).limit(limit)
```

* 集合的信息(数据个数等属性)
```
db.student.stats();

【数量】
db.student.find().count();
```

##### 3.3 update

* 暗含查找的命令 

```
update 只能修改一条数据（就是一个文档）

【找到那些数据，给其中数据中的哪些属性修改】
db.student.update({"name":"xiaom"},{$set:{"age":16}})

【查询成绩中数学成绩 为 70，改年龄为23】
db.student.update({"sorce.shuxue":70},{$set:{"age":23}})

【多条数据修改】
db.student.update({},{$set:{"age":23}},{multi:ture})

【直接替换一个数据（一个文档）,就是没有后面的$set关键字】
db.student.update({"name":"xiaom"},{"age":16});
```

##### 3.4 remove

```
【删除一个集合，集合就没有了】
db.some_collection.drop();

【集合下的文档全部被删除】
db.student.remove({})

【删除一个数据（文档），默认删除多个】
db.student.remove({"name":'xiaom'},{})

【删除一个数据（文档），删除一个】
db.restaurants.remove( { "borough": "Queens" }, { justOne: true } )
```

##### 3.5 index索引

* 设置name为该集合的正向的索引。
```
db.student.createIndex({"name":1});
```
* 好处：这样会加快搜索的速度。
* 缺点：就是插入一个数据变慢了。
* 没有大量的插入业务，就可以用这个。

* 这个字段为索引，然后这个字段的值必须唯一。每个文档都是唯一的。
```
db.members.createIndex( { "user_id": 1 }, { unique: true } );
```

### 4.mongoVUE 可视化

* IP：127.0.0.1  port:27017

