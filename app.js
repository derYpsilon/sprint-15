const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
const auth = require('./middlewares/auth')
const { createUser, login } = require('./controllers/auth')


const { PORT = 3000 } = process.env

const app = express()

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

app.post('/signup', createUser)
app.post('/signin', login)

app.use(auth)

app.use('/users', usersRoute)
app.use('/cards', cardsRoute)
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' })
})

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT)
})
