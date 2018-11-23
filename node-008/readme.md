# Cookie @1.4.0

* HTTP是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页面，服务器无法认识到，这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。那么世界就乱套了，比如我上一次访问，登陆了，下一次访问，又让我登陆，不存在登陆这事儿了。

* Cookie是一个简单到爆的想法：当访问一个页面的时候，服务器在下行HTTP报文中，命令浏览器存储一个字符串；浏览器再访问同一个域的时候，将把这个字符串携带到上行HTTP请求中。
* 第一次访问一个服务器，不可能携带cookie。 必须是服务器得到这次请求，在下行响应报头中，携带cookie信息，此后每一次浏览器往这个服务器发出的请求，都会携带这个cookie。

* cookie是不加密的，用户可以自由看到；
* 用户可以删除cookie，或者禁用它
* cookie可以被篡改
* cookie可以用于攻击
* cookie存储量很小。未来实际上要被localStorage替代，但是后者IE9兼容。
* express中的cookie，req负责识别cookie res负责设置cookie， 

```
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//查询一个地方的攻略，URL语法： http://127.0.0.1/gonglue?mididi=北京
app.get("/gonglue",function(req,res){
    //得到get请求，用户查询的目的地
    var mudidi = req.query.mudidi;
    //记录用户喜好
    //先读取用户的喜好，然后把新的数据push进入数组，然后设置新的cookie
    var mudidiarry = req.cookies.mudidi || [];
    mudidiarry.push(mudidi);
    //maxAge在Express中以毫秒为单位
    res.cookie("mudidi",mudidiarry,{maxAge: 900000, httpOnly: true});
    res.send(mudidi + "旅游攻略");
});

app.get("/",function(req,res){
    res.send("猜你喜欢" + req.cookies.mudidi);
});
```

* 猜你喜欢，就是收集用户信息，下行响应报头中记录起来，下次访问时，就会给你退回来。
* 用户的信息存在用户端上。

# session @1.11.3

* 中文：会话
* Session不是一个天生就有的技术，而是依赖cookie。
* session依赖cookie，当一个浏览器禁用cookie的时候，登陆效果消失； 或者用户清除了cookie，登陆也消失。
* session比cookie不一样在哪里呢？session下发的是乱码，并且服务器自己缓存一些东西，下次浏览器的请求带着乱码上来，此时与缓存进行比较，看看是谁。所以，一个乱码，可以对应无限大的数据。
* 任何语言中，session的使用，是“机理透明”的。他是帮你设置cookie的，但是足够方便，让你感觉不到这事儿和cookie有关。
* 就是服务器对用户的信息加密和缓存(在内存上)，给用户下行响应cookie里设置一个加密后的str。
* 看下面的代码，感觉是把req进行包装了，设置后发送前应该会进行加密。

```
var session = require("express-session");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

【都是在req.session上查看和设置】
app.get("/",function(req,res){
    if(req.session.login == "1"){
        res.send("欢迎" + req.session.username);
    }
});
app.get("/checklogin",function(req,res){
    var tianxiedeusername = req.query.username;
    var tianxiedepassword = req.query.password;

    db.find("users",{"username":tianxiedeusername},function(err,result){
        if(result.length == 0){
            res.send("你的登录名写错了，没有这个注册用户");
            return;
        }
        var shujukuzhongdepassword = result[0].password;
        if(shujukuzhongdepassword == tianxiedepassword){
            【都是在req.session上查看和设置】
            req.session.login = "1";
            req.session.username = result[0].username;
            res.send("成功登陆！你是" + result[0].username);
        }
        else{
            res.send("密码错误！");
        }
    })
});
```

