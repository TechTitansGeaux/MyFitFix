const router = require('express').Router();
const { Message } = require('../db/index.js');

// SAVE a message to the database
router.post('/', (req, res) => {
  // access message and recipient on request body
  const { message, recipientId, senderName } = req.body;
  // access userId from request user
  const { _id } = req.user;
  // use mongoose method to create message
  Message.create({ message, senderId: _id, senderName, recipientId })
    .then((messageObject) => {
      res.status(201).send(messageObject);
    })
    .catch((err) => {
      console.error('Failed to POST message to database: ', err);
      res.sendStatus(500);
    });
});

// GET messages by senderId and recipientId
router.get('/:senderId/:recipientId', async (req, res) => {
  // access senderId and recipientId from req body
  const { senderId, recipientId } = req.params;
  // use mongoose method to find
  await Message.find({senderId, recipientId})
    .then((messagesArray) => {
      res.status(200).send(messagesArray);
    })
    .catch((err) => {
      console.error('Failed to GET messages by sender/recipient IDs: ', err);
      res.sendStatus(500);
    });
})

module.exports = router;
