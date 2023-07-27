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

// GET messages by senderId and recipientId
router.get('/', (req, res) => {
  // access senderId and recipientId from req body
  const { senderId, recipientId } = req.body;
  // use mongoose method to find
  Message.find({ senderId, recipientId })
    .then((resObj) => {
      console.log(resObj, '<---- resObj from get messages by IDs');
      res.status(200).send(resObj);
    })
    .catch((err) => {
      console.error('Failed to GET messages by sender/recipient IDs: ', err);
      res.sendStatus(500);
    });
})

module.exports = router;
