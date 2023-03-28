const router = require('express').Router();
const axios = require('axios');
const { CaloriesIn } = require('../db/index.js');

router.get('/food', (req, res) => {
  const { q } = req.query;
  const options = {
    url: `https://api.calorieninjas.com/v1/nutrition`,
    method: 'GET',
    params: { query: q },
    headers: {
      'X-Api-Key': process.env.nutritionApi
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
  const { _id } = req.user;
  const newCalorie = new CaloriesIn({
    foodItem: name,
    weightInGrams: weight,
    calories: calories,
    user: _id
  });
  newCalorie.save();
  res.sendStatus(201);
})

router.get('/product', (req, res) => {
  const { _id } = req.user;
  CaloriesIn.find({ user: _id })
    .then((ingredients) => {
      res.status(200).send(ingredients);
    })
    .catch((err) => {
      console.error('Failed to fetch from db:', err);
      res.sendStatus(500);
    })
})

module.exports = router;
