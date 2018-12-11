### gulp+express

* 这个版本适合前端使用gulp进行监听文件变化，后台用node提供API和static。一人开发。
* 监听express服务重启：nodemon
* 启动后台服务后，用browserSync代理express启动的服务，参与gulp编码后的浏览器的reload

##### 1.gulp第1个任务

* nodemon可执行express的服务,express提供static和api服务
* nodemon能监视目录下的所有文件，去除static文件的（webapp、src_webapp），其他都会监听，有变化就会重新启动我的express的服务。

```
var nodemon = require('gulp-nodemon');
nodemon({
    script: './api_server/app.js',
    ignore : [
      "./src_webapp/",
      "./webapp/",
    ],
    env: { 'NODE_ENV': 'development'}  
  });
```

##### 2.gulp第2个任务

* 在4000端口启动代理服务器，代理3000。在4000端口的静态页面的API和static请求，可访问到3000端口

```
  browserSync.init({
    proxy: 'http://localhost:3000',
    browser: 'chrome',
    notify: false,
    //这个是browserSync对http://localhost:3000实现的代理端口
    port: 4001
  });
```

* browserSync代理服务器，到底是提供什么方法了？就是根据gulp前端的文件，而进行reload功能。

### 总结

* 服务器：启动express的服务,express提供static和api服务
* nodemon（配置排除webapp和src_webapp），就是监听后台的代码，重启。
* browserSync拿到服务器的reload，成为代理服务器。
* gulp监听src_webapp，让browserSync可reload。

### 其他

* browserSync：可拿到JAVA启动的服务的reload，成为代理服务器。
* gulp监听前端代码，使browserSync代理服务器可执行reload。
* 不用后台JAVA写专门的代码配置跨域。
* 猜测：若后台的服务只是自己启动，不想通过nodemon进行，也就是不想后台的代码被nodemon监听和重启。gulpfile.js应该把[node关闭]，在命令行设置启动 node 服务。

```
  "scripts": {
    "dev": "cross-env NODE_ENV=dev node ./api_server/app.js && gulp",
  },
```

* 经过试验，上面的想法行不通，因为`node ./api_server/app.js && gulp`都是启动两个服务，只要是启动服务的命令，都不算是执行完成，所以gulp不会执行。

###### 引出本案例到gulp_002