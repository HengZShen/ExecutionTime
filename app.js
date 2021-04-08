const express = require('express')

const PORT = process.env.PORT || 3000
// mongoose 連線
// 直接載入 不需要儲存 因為後面也不會用到
require('./config/mongoose')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const { urlencoded } = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
const { route } = require('./routes')


const app = express()



app.use(methodOverride('_method'))

// body parser
app.use(urlencoded({ extended: true }))



// set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')



// 計算時間
function getdurationTime(start) {

  // seconds to nanoseconds
  const NS_PER_SEC = 1e9
  // nanoseconds to milliseconds
  const NS_TO_MS = 1e6
  // get duration time
  const diff = process.hrtime(start)
  // change unit, show duration time in milliseconds
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

// get every request from routes followed by '/'
app.use((req, res, next) => {
  const date = new Date()
  let day = date.getDate()
  let year = date.getFullYear()
  // month start from 0 (January)
  let month = (date.getMonth() + 1)
  // 台灣為國際標準時間 + 8
  let hour = (date.getHours() + 8)
  let minute = date.getMinutes()
  let second = date.getSeconds()

  console.log(`[GET REQUEST] ${year}-${month}-${day} ${hour}:${minute}:${second} | ${req.method} from ${req.originalUrl}`)

  const start = process.hrtime()
  // 將開始時間記載在req object中
  req.start = start

  next()
})


app.use((req, res, next) => {

  res.on('finish', () => {
    const date = new Date()
    let day = date.getDate()
    let year = date.getFullYear()
    // month start from 0 (January)
    let month = (date.getMonth() + 1)
    // 台灣為國際標準時間 + 8
    let hour = (date.getHours() + 8)
    let minute = date.getMinutes()
    let second = date.getSeconds()

    console.log(`[FINISHED] ${year}-${month}-${day} ${hour}:${minute}:${second} | ${req.method} from ${req.originalUrl} | total time: ${getdurationTime(req.start)} milliseconds`)
  })

  res.on('close', () => {
    const date = new Date()
    let day = date.getDate()
    let year = date.getFullYear()
    // month start from 0 (January)
    let month = (date.getMonth() + 1)
    // 台灣為國際標準時間 + 8
    let hour = (date.getHours() + 8)
    let minute = date.getMinutes()
    let second = date.getSeconds()

    console.log(`[CLOSE] ${year}-${month}-${day} ${hour}:${minute}:${second} | ${req.method} from ${req.originalUrl} | total time: ${getdurationTime(req.start)} milliseconds`)
  })

  next()
})

// send response immediately
app.get('/fast/', (req, res) => {
  // res.sendStatus(200)
  res.send('hi fast')
})

// mock heavy load, send response after 10 seconds
app.get('/slow/', (req, res) => {
  setTimeout(() => res.send('hi slow'), 5000)
})


app.use(routes)




app.listen(PORT, () => {
  console.log(`The server is running on https://localhost:${PORT}`)
})