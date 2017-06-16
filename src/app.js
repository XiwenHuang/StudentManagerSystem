'use strict'
/**
 * 这是一个入口函数，在这个入口函数判断一级路由地址，再
 * 分配到对应的路由器里面再由对应的路由器根据二级路由地
 * 址分配到 对应的控制器
 */
// import packages
const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')

// create app
const app = express()

// 集成静态资源中间件
app.use(express.static(path.join(__dirname, 'statics')))

// 使用session中间件
app.use(session({secret: 'keyboard cat', cookie:{maxAge: 180000}}))

// 使用bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))

//权限校验
app.all('/*',(req,res,next)=>{
    if (req.url.includes('/account')) {//这些不需要拦截
      next()
    }else{//都需要进行权限校验
        if (req.session.loginedName!=null) {
          next()
        }else{
          res.setHeader("Content-Type","text/html;charset=utf-8")
          res.end("<script>alert('您还没有登录,请先登录');window.location.href='/account/login'</script>")
        }
    }
})


// integration routers(应该放在最后)
//  登录路由
const loginRouter = require(path.join(__dirname, 'routers/loginRouter.js'))
app.use('/account', loginRouter)

// 学生管理的路由
const studentManagerRouter = require(path.join(__dirname, 'routers/studentManagerRouter.js'))
app.use('/studentmanager', studentManagerRouter)



// open the app service
app.listen(8899, '127.0.0.1', (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log("app is ok, let's do it")
})
