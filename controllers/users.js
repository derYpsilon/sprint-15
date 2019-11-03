const User = require('../models/user')

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Server Controller Error while reading All Users' }))
}
module.exports.getSingleUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Нет пользователя с таким id' }))
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка при обновлении профиля ${err}` }))
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      res.send({ data: user })
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка при обновлении аватара ${err}` }))
}
