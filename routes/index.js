const express = require('express')

const router = express.Router()

const home = require('./modules/home')

const todos = require('./modules/todos')




router.use('/todos', todos)
router.use('/', home)






module.exports = router