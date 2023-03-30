const router = require('express').Router();
const axios = require('axios');
const { CaloriesIn } = require('../db/index.js');

//Handler for the nutrition api
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

//Handler to create new documents in the db
router.post('/food', (req, res) => {
  const { foodList, date } = req.body;
  const { _id } = req.user;
  const newCalorie = new CaloriesIn({
    foodList: foodList,
    date: date,
    user: _id
  });
  newCalorie.save();
  res.sendStatus(201);
})

//Handler to fetch the foodList from the db
router.get('/product', (req, res) => {
  const { _id } = req.user;
  const { q } = req.query
  CaloriesIn.findOne({ user: _id, date: q })
    .then((ingredients) => {
      res.status(200).send(ingredients);
    })
    .catch((err) => {
      console.error('Failed to fetch from db:', err);
      res.sendStatus(500);
    })
})

//Handler to update a document in the CaloriesIn collection by date
router.put('/food/:date', (req, res) => {
  const { foodList } = req.body;
  const { date } = req.params;

  CaloriesIn.findOne({ date: date })
    .then(entry => {
      if (entry) {
        entry.foodList = foodList
        entry.save();
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      console.error('Failed to update db:', err);
      res.sendStatus(500);
    })
})

module.exports = router;
