'use strict'

const xtpl = require('xtpl')
const path = require('path')

const databaseHelper = require(path.join(__dirname, '../tool/databaseHelper.js'))

// 暴露显示学生列表的方法
exports.showStuList = (req, res) => {
    // 获取关键字
        const keyword = req.query.keyword || ''

        // 每页有多少条
        const everyPageCount = parseInt(req.query.everyPageCount || '2')

        // 分页的处理
        const currentPageIndex = parseInt(req.query.currentPageIndex || '0')
        const skipCount = currentPageIndex * everyPageCount

        // 获取总个数
        databaseHelper.getCount('stuList', {name: {$regex: keyword}}, (err, totalCount) => {
            const totalPage = totalCount % everyPageCount == 0 ? totalCount / everyPageCount : parseInt(totalCount / everyPageCount) + 1
            const pageArray = []
            for(var i = 0; i < totalPage; i++) {
                pageArray.push(i)
            }

            //去数据库查询所有学生列表
            databaseHelper.findList('stuList', {name: {$regex: keyword}}, skipCount, everyPageCount, (err, docs) => {
                xtpl.renderFile(path.join(__dirname, '../views/list.html'),{array:docs,keyword:keyword,pageArray:pageArray,currentPageIndex:currentPageIndex,totalPage:totalPage,loginedName:req.session.loginedName}, (err, content) => {
                    res.setHeader("Content-Type","text/html;charset=utf-8")
                    res.end(content)
                })
            })
        })
}

// 暴露了显示添加学生的页面的方法
exports.showAddStu = (req, res) => {
    xtpl.renderFile(path.join(__dirname, '../views/add.html'), (err, content) => {
        res.setHeader("Content-Type","text/html;charset=utf-8")
        res.end(content)
    })
}

// 暴露添加学生的方法
exports.addOneStu = (req, res) => {
    databaseHelper.addOne('stuList', req.body, (err, doc) => {
            if(doc != null) {
                res.setHeader("Content-Type","text/html;charset=utf-8")
                res.end("<script>window.location.href='/studentmanager/list'</script>")
            }else {
                res.setHeader("Content-Type","text/html;charset=utf-8")
                res.end("<script>alert('插入失败')</script>")
            }
    })
}

// 获取学生信息页面
exports.getEditStudentPage = (req, res) => {
    const studentId = databaseHelper.ObjectId(req.params.studentId)
    databaseHelper.findOne('stuList', {_id: studentId}, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {stuList: doc, loginedName: req.session.loginedName}, (err, content) => {
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end(content)
        })
    })
}

//修改学生信息
exports.editStudent = (req, res) => {
    const studentId = databaseHelper.ObjectId(req.params.id)
    databaseHelper.updateOne('stuList', {_id: studentId}, req.body, (err, doc) => {
        if(doc != null) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<script>window.location.href="/studentmanager/list"</script>')
        }else {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<script>alert("修改失败")</script>')
        }
    })
}

// 删除学生信息
exports.deleteStudent = (req, res) => {
    const studentId = databasemanager.ObjectId(req.params.sid)

    databasemanager.deleteOne('stuList', {_id: studentId}, (err, doc) => {
        if (doc != null) {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<script>window.location.href="/studentmanager/list"</script>')
        }else {
            res.setHeader('Content-Type', 'text/html;charset=utf-8')
            res.end('<script>alert("删除失败")</script>')
        }
    })
}

