### package


* node轻内核，更多功能是体现在第三方包上，故package就是我们要的包。

#### 0.包被引入：

```
var foo = require('./xx.js');
```

#### 1.找包目录：
* **node_modules除了可以直接在当前包的目录或者父级目录下放置，还可以通过环境变量进行配置。这样做的好处，就是比如我在自己的电脑上开发所有的项目的时候，所有的依赖都放在一个公共的地方，不用所有的项目都在当前的目录下下载需要的包，很方便！**
* 安装上面的方式的包，就得在那个特定的位置上进行下载。

```
NODE_PATH:后面把node_modules放到专门一个地址内部。
```

#### 2.找文件：

* 默认找内部的index.js文件
* 无index.js时，会读取package.json里面的main:'app.js'

#### 3.用包的原因：

* 是因为内部进行输出:

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

#### 4.package.json

* 本包的依赖
* 包默认被输出寻找的JS文件，
* 执行的命令行代码
* ^0.0.0 就是把依赖的包的大版本号固定住了。


### 路径问题

* 包require()相对路径
* 文件的引用用绝对路径

