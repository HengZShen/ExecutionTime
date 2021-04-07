const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

// mongoose 與 資料庫 連線 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得db連線狀態的存進參數 
const db = mongoose.connection

// 當連線有錯誤 回報
db.on('error', () => {
  console.log('mongodb error!')
})

// 當連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

module.exports = db

