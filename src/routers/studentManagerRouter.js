'use strict'

// import packages
const express = require('express')
const path = require('path')

// create loginRouter(obj)
const studentManagerRouter = express.Router()

// throw the complicated logical code to loginCtrollers
const studentManagerCtrl = require(path.join(__dirname, '../controllers/studentManagerListController.js'))

// second part Router
//  获取学生列表页面
studentManagerRouter.get('/list', studentManagerCtrl.showStuList)
// 获取新增学生页面
studentManagerRouter.get('/add', studentManagerCtrl.showAddStu)
// 新增学生
studentManagerRouter.post('/add', studentManagerCtrl.addOneStu)
// 获取编辑学生页面的信息
studentManagerRouter.get('/edit/:studentId',studentManagerCtrl.getEditStudentPage)
// 修改学生信息
studentManagerRouter.post('/edit/:id', studentManagerCtrl.editStudent)
// 删除学生信息
studentManagerRouter.get('/delete/:sid', studentManagerCtrl.deleteStudent)

module.exports = studentManagerRouter
