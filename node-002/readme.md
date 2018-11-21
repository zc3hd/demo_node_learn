### 1.package

##### 1.1自己写的包

* **node是轻内核，更多功能是体现在第三方包上。所以package就是我们要的包或者项目。**
* package是我们的主要，有任何需要，在npm的社区肯定有这个包了。
* 包可以被引入：

```
var foo = require('./xx.js');
```

* 同样，能被引入，是因为内部我们进行了输出:

```
【单个属性、方法的输出:】
var msg = 'xxxx';
var fn = function(){};

exports.msg = msg;
exports.fn = fn;

【构造函数的输出：】
function FN_tool(){};
FN_tool.prototype = {};

module.exports = FN_tool;
```

* 注意这是node后台的引入和引出。前端的引入和引出：

```
import fn from './xx.js';

export default obj;
```

##### 1.2.生态圈的公共包

* 生态圈的公共包，引入就是直接找名字就可以了。

```
var foo = require('xx');
```

* 寻找的目录是在**当前或往父级文件夹目录**下node_modules下的包。
* 找到这个名字的文件夹，然后默认找内部的index.js文件。
* 当不是index.js文件时，就会读取package.json文件。里面的main:'app.js';
* **package.json是本包的依赖，和本包默认被输出寻找的JS文件，看执行的命令行代码。**
* ^0.0.0 就是把依赖的包的大版本号固定住了。

* **node_modules除了可以直接在当前包的目录或者父级目录下放置，还可以通过环境变量进行配置。这样做的好处，就是比如我在自己的电脑上开发所有的项目的时候，所有的依赖都放在一个公共的地方，不用所有的项目都在当前的目录下下载需要的包，很方便！**
* 安装上面的方式的包，就得在那个特定的位置上进行下载。

```
NODE_PATH:后面把node_modules放到专门一个地址内部。
```

### 2.路径问题

* node执行一个JS，JS里面的引用require()都是相对路径，里面的引用都是从当前执行的文件为路径进行寻找自己的路径。
* **文件的引用用绝对路径：__dirname+'./xx.txt';这个就解释webpack—demo-002里面的路径问题，因为是以一个目录下进行编译，操作的是文件，要用绝对路径。**

