'use strict'

// 引入数据库对象db
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const url = "mongodb://localhost:27017/studentManagerSystem"
const ObjectId = mongodb.ObjectId

// 暴露数据库每条数据库的ID给我们的控制器使用
exports.ObjectId= ObjectId

// 专门用于获取db对象的一个方法
function getDB(callback) {
    MongoClient.connect(url, (err, db) => {
        callback(err, db)
    })
}

// 查找唯一的一条数据
exports.findOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        var collection = db.collection(collectionName)
        collection.findOne(condition, (err, doc) => {
            callback(err, doc)

            db.close()
        })
    })
}

// 获取列表
exports.findList  = (collectionName, condition, skipCount, limitCount, callback) => {
    getDB((err, db) => {
            var collection = db.collection(collectionName);
            collection.find(condition).skip(skipCount).limit(limitCount).toArray((err, docs) => {
                callback(err, docs)
                 // 连接完就关闭数据库
                db.close()
            })
    })
}

// 获取我们满足条件的个数
exports.getCount = (collectionName, condition, callback) => {
    getDB((err, db) => {
        var collection = db.collection(collectionName);
        // 这个mongodb带的方法，返回的是总数据有几条的回调函数
        collection.find(condition).count((err, count) => {
            callback(err, count)
        })
    })
}

exports.addOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        var collection = db.collection(collectionName);
        // 新增数据
        collection.insertOne(condition, (err, doc) => {
            callback(err, doc)
        })
    })
}

exports.updateOne = (collectionName, condition, newValue, callback) => {
    getDB((err, db) => {
        var collection = db.collection(collectionName); 
        collection.updateOne(condition, {$set: newValue}, (err, doc) => {
            callback(err, doc)
        })
    })
}

// 删除一条文档
exports.deleteOne = (collectionName, condition, callback) => {
    getDB((err, db) => {
        var collection = db.collection(collectionName);
        // 新增数据
        collection.deleteOne(condition, (err, doc) => {
            callback(err, doc)
        })
    })
}
