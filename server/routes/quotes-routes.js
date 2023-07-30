const axios = require('axios');
const router = require('express').Router();
const { Quotes } = require('../db/index.js');

router.get('/genQuote', (req, res) => {
  axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', { headers: { 'X-Api-Key': 'i1RVslbc3v6uNX3VxuvEUw==Uib4YCm5PSYP1j9g' } })
    .then((result) => {
      // result.data is quote obj
      res.send(result.data);
    })
    .catch((err) => {
      console.log('error generating quote: ', err);
      res.sendStatus(500);
    })

})

router.get('/allQuotes', (req, res) => {
  const { _id } = req.user;
  Quotes.find({user: _id})
    .then((quotes) => {
      res.send(quotes);
    })
    .catch((err) => {
      console.log('error finding all quotes: ', err);
    })
})

router.post('/saveQuote', (req, res) => {
  const { _id } = req.user;
  const { quote } = req.body;
  Quotes.create({user: _id, quote: quote})
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
       console.log('error adding quote to database: ', err)
       res.sendStatus(500);
    })
})

router.delete('/deleteQuote:quoteId', (req, res) => {
  const { quoteId } = req.params;
  // console.log(quoteId);
  Quotes.deleteOne({_id: quoteId})
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error removing quote from database: ', err);
    })
})

module.exports = router;
