const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')






router.get('/', (req, res) => {
  // 拿到所有 Todo 資料
  Todo.find()
    .sort({ _id: 'asc' })
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log(error))

})






module.exports = router