const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')





// router.use('/', function (req, res, next) {
//   const date = new Date()
//   req.requestTime = date.getSeconds()
//   next()
// })

router.get('/', function (req, res, next) {

  setTimeout(() => {
    Todo.find()
      .sort({ _id: 'asc' })
      .lean()
      .then(todos => {
        const date = new Date()
        let day = date.getDate()
        let year = date.getFullYear()
        // month start from 0 (January)
        let month = (date.getMonth() + 1)
        // 台灣為國際標準時間 + 8
        let hour = (date.getHours() + 8)
        let minute = date.getMinutes()
        let second = date.getSeconds()

        console.log(`${year}-${month}-${day} ${hour}:${minute}:${second} | ${req.method} from ${req.originalUrl} | total time: ${date.getSeconds() - req.requestTime}s`)
        res.render('index', { todos })
      })
      .catch(error => console.log(error))
  }, 5000)

})


module.exports = router