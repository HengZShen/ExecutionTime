const express = require('express')

const router = express.Router()



const myLogger = function (req, res, next) {
  console.log("LoGGeD")
  res.send('Hihihihi')
}

router.use(myLogger)

router.get('/', function (req, res) {
  res.send('Hello World')
})















module.exports = router