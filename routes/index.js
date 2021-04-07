const express = require('express')

const router = express.Router()


const home = require('./modules/home')

const todos = require('./modules/todos')

const midFunction = require('./modules/middlewareFunction')



router.use('/', home)
router.use('/todos', todos)
router.use('/test', midFunction)




module.exports = router