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


const app = express()



app.use(methodOverride('_method'))

// body parser
app.use(urlencoded({ extended: true }))



// set view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: ".hbs" }))
app.set('view engine', 'hbs')

app.use('/', function (req, res, next) {
  const date = new Date()
  req.requestTime = date.getSeconds()
  next()
})


app.use(routes)

// won't execute
app.use((req, res, next) => {
  console.log("this won't show")
  next()
})


app.listen(PORT, () => {
  console.log(`The server is running on https://localhost:${PORT}`)
})