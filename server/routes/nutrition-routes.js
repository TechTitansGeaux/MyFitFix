const router = require('express').Router();
const axios = require('axios');
const keys = require('../config/keys.js');
const { CaloriesIn } = require('../db/index.js');

router.get('/food', (req, res) => {
  const { q } = req.query;
  const options = {
    url: `https://api.calorieninjas.com/v1/nutrition`,
    method: 'GET',
    params: { query: q },
    headers: {
      'X-Api-Key': keys.nutrition.apiKey
    }
  };
  axios(options)
    .then((result) => {
      res.status(200);
      res.send(result.data);
    })
    .catch((err) => {
      console.error('Failed to fetch:', err);
      res.sendStatus(500);
    });
});

router.post('/food', (req, res) => {
  const { name, calories, weight } = req.body;
  const newCalorie = new CaloriesIn({
    foodItem: name,
    weightInGrams: weight,
    calories: calories,
  });
  newCalorie.save();
})

module.exports = router;
