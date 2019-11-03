const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).send({ message: 'Тело запроса пустое' })
  const {
    name, about, avatar, email, password,
  } = req.body
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({
        _id: user._id, name: user.name, about: user.about, email: user.email,
      }))
      .catch((err) => res.status(400).send({ message: `Error while creating User -- ${err}` })))
}

module.exports.login = (req, res) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY,
        { expiresIn: '7d' },
      )
      res
        .status(201)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send({ message: 'Logged successfully' })
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message })
    })
}
