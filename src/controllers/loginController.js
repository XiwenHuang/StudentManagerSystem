'use strict'

// 引包
const fs = require('fs')
const path = require('path')
const captchapng = require('captchapng')

// 引入数据库的包
// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017/studentManagerSystem'
const databaseHelper = require(path.join(__dirname, '../tool/databaseHelper.js'))


// 获取登录页面
exports.getLoginPage = (req, res) => {
    fs.readFile(path.join(__dirname, '../views/login.html'), (err, data) => {
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(data)
    })
}

//返回验证码的图片给浏览器(这是一个验证码插件)
exports.getVcodeImage = (req,res)=>{
      var vcode = parseInt(Math.random()*9000+1000)

      // 在请求过来的时候,就把随机的验证码的值用session储存起来
      req.session.vcodeId = vcode

      //todo vcode 要在服务端存储起来
      var p = new captchapng(80,30,vcode); // width,height,numeric captcha 
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        res.end(imgbase64);
}

// 判断登录的验证码是否和后台存储的验证码相等
exports.checkLogin = (req, res) => {
    const params = req.body
    const status = {code: 1, mean: "OK"}
    if (parseInt(params.vcode) != req.session.vcodeId) {
        status["code"] = 0
        status["mean"] = "验证码错误"
        res.json(status)
        return
    }
    // 接下来应该判断用户的账号和密码是否和数据库里面的一致了
    databaseHelper.findOne('account', {account: params.username, password: params.password}, (err, doc) => {
        if(doc == null) {
            status.code = 2
            status.mean = "用户名或者密码错误"
        }else {
            // 登陆成功后，把用户名存储到我们的session中去
            req.session.loginedName = params.username
        }
        res.json(status)
    })
}

// 退出的逻辑
exports.logout = (req, res) => {
    req.session.loginedName = null
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end("<script>window.location.href='/account/login'</script>")
}
