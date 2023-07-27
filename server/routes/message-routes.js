const router = require('express').Router();
const { Message } = require('../db/index.js');

// SAVE a message to the database
router.post('/', (req, res) => {
  // access message and recipint on request body
  const { message, senderId, recipientId } = req.body;
  // use mongoose method to create message
  Message.create({ message, senderId, recipientId })
    .then((messageObject) => {
      res.status(201).send(messageObject);
    })
    .catch((err) => {
      console.error('Failed to POST message to database: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;
