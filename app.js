const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const usersRoute = require('./routes/users')
const cardsRoute = require('./routes/cards')
const auth = require('./middlewares/auth')
const { createUser, login } = require('./controllers/auth')
const Error404 = require('./errors/error404')


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
app.get('*', (req, res, next) => {
  next(new Error404('Ресурс не найден'))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode ? err.statusCode : 500).send({ message: err.message })
})

app.listen(PORT, () => {
  console.log('App is listening to port ', PORT)
})
