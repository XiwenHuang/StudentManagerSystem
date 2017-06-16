'use strict'

// import packages
const express = require('express')
const path = require('path')

// create loginRouter(obj)
const loginRouter = express.Router()

// throw the complicated logical code to loginCtrollers
const loginCtrl = require(path.join(__dirname, '../controllers/loginController.js'))

// second part Router
loginRouter.get('/login', loginCtrl.getLoginPage)
loginRouter.get('/vcode', loginCtrl.getVcodeImage)
loginRouter.post('/login', loginCtrl.checkLogin)
loginRouter.get('/logout', loginCtrl.logout)

module.exports = loginRouter
