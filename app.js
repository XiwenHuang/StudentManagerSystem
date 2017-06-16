'use strict'

// 引包
const express = require('express')
const path = require('path')

// 创建app
const app = express()

// 集成路由
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))
app.use('/account', accountRouter)

// 开启web服务
app.listen(8899, '127.0.0.1', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('The app is OK!')
})
