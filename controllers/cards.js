const Card = require('../models/card')

module.exports.createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: `Server Controller Error while creating Card -- ${err}` }))
}

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Server Controller Error while reading All Cards' }))
}

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) return Promise.reject(new Error('Такой карты нет'))
      if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) return Promise.reject(new Error('Карта не ваша! Удалить нельзя!'))
      Card.remove(card)
        .then((cardToDelete) => res.send(cardToDelete !== null ? { data: card } : { data: 'Nothing to delete' }))
        .catch((err) => res.status(500).send({ message: err.message }))
    })
    .catch((err) => res.status(500).send({ message: err.message }))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Server Controller Error while liking Card' }))
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Server Controller Error while disliking Card' }))
}
