const axios = require('axios');
const router = require('express').Router();
const { User, Quotes } = require('../db/index.js');

router.get('/genQuote', (req, res) => {
  axios.get('https://api.api-ninjas.com/v1/quotes?category=inspirational', { headers: { 'X-Api-Key': 'i1RVslbc3v6uNX3VxuvEUw==Uib4YCm5PSYP1j9g' } })
    .then((result) => {
      // result.data is quote obj
      res.send(result.data);
    })
    .catch((err) => {
      console.log('error generating quote: ', err)
    })

})

module.exports = router;
