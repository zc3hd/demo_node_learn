# node 001

### 1.node是什么？
* node.js:node是JS的运行环境，来源是chrome的V8引擎。
* JS构成：ECMA、BOM（浏览器对象模型）、DOM(文档对象模型)
* 特性：单线程、非阻塞I/O、事件机制
* 缺点：就是单线程，被干掉就真的被干掉了。
* 使用于：用户表单收集、考试系统、聊天室、图文直播、返回JSON的api。就是node更善于IO的请求处理，不擅长进行大量计算，宏观上就是高并发！
* 无法挑战PHP、JSP老牌的后台语言。
* node只是个极客的小工具而已，就是资源就这么点，电就那么点，能不能玩？能玩！轻量级内核、主要是第三方包的支持。

### 2.单线程、非阻塞IO、事件机制

* 这个这样理解，每个用户来的请求都是一个指令，就是用户需要什么东西。然后所有的用户的需求都是排列在一个线程上面的，有个集中处理用户需要的地方就是事件调度中心，处理用户的需求，如果A用户的需求是直接要一个东西，然后事件队列就直接给出这个事件的结果给A，如果B用户是一个IO，这个IO就由另外的处理IO的线程去找IO的数据，和我们的线程是异步的，没有关系的。我们的线程继续处理下个请求或需求。若正在处理的过程中，B用户的IO结果回来了，那么调度中心会优先安排B用户的事件进行执行，这就是最好的地方。

### 3.NVM 安装

* node version manager
```
1.把nvm压缩包解压到 c:/dev/nvm 下面
2.设置系统 用户变量：
   NVM_HOME:c:/dev/nvm 
   NVM_SYMLINK:c:/dev/nodejs
3.PATH里添加这两个变量：%NVM_HOME%;%NVM_SYMLINK%; 
```

* path:所有的cmd命令都是先通过这个path下所有路径下寻找这个命令。

### 4.NPM 安装

* node package manager
```
1.设置变量
   NPM_HOME:%NVM_HOME%/npm
2.增加到path
```

* npm全局包位置的的设置
```
1.把.npmrc的文件丢到当前系统用户的目录下

prefix = C:\dev\nvm\npm
registry = http://registry.npm.taobao.org/
//registry.npm.taobao.org/:_password = MjUzOTEx
//registry.npm.taobao.org/:username = zc3hd
//registry.npm.taobao.org/:email = zhang_hongc@sina.com
//registry.npm.taobao.org/:always-auth = false

2.cmd:npm config set prefix "C:\dev\nvm\npm"
```

* 一些命令：
```
npm i == npm install
npm i xx -S= npm i xx --save
npm i xx -D= npm i xx --save-dev
```

* package.json是我们最主要使用的，node就是用包。里面记录项目的信息和依赖的包。

### 5.GIT 安装

* 源码管理工具
```
1. exe安装
2. 把变量名添加到path :%GIT_HOME%/bin
```

### 6.cordova

* cordova是搞混合app开发玩的，这个后期一定要了解。

