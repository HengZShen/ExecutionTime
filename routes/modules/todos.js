const express = require('express')

const router = express.Router()

const Todo = require('../../models/todo')



router.get('/new', (req, res) => {
  return res.render('new')
})

// Create
router.post('/', (req, res) => {
  const name = req.body.name

  Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 檢視特定資料
router.get('/:id', (req, res, next) => {
  const date = new Date()
  let second = date.getSeconds()
  // 30秒之後 才能進入進入detail page
  if (second >= 30) return next('route')
  else next()
}, (req, res) => {
  // 30秒之前 無法顯示detail page
  const date = new Date()
  let second = date.getSeconds()
  res.send(`Before 30, now time is ${second}`)
})


// next('route') 會到下一個route、且為同一個path(需要complete match)
// never show up
router.get('/:id/intercept', (req, res) => {
  res.send('intercept')
})

// 30秒之後  接到這裡
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))

})




// 將多個middleware 以array方法包裝 並放進 router
function hello(req, res, next) {
  console.log('hello')
  next()
}

function myname(req, res, next) {
  console.log('my name is henry')
  next()
}

function editTodo(req, res) {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
}


// 修改資料
router.get('/:id/edit', [hello, myname], editTodo)

router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})




// 刪除資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router