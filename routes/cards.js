const cards = require('express').Router()
const {
  createCard, getAllCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards')

cards.post('/', createCard)
cards.get('/', getAllCards)
cards.delete('/:id', deleteCard)
cards.patch('/:cardId/likes', likeCard)
cards.delete('/:cardId/likes', dislikeCard)

module.exports = cards
