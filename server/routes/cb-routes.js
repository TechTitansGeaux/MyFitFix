const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const { User, Entries, CaloriesIn, CaloriesBurned } = require('../db/index.js');


let burn = 0;

router.get('/caloriesBurned', (req, res) => {

const { activity, weight, duration } = req.query;

  const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/caloriesburned',
    params: {activity: activity, weight: weight, duration: duration},
    headers: {
      'X-Api-Key': process.env.CALORIES_BURNED_API,
    }
  };

  axios.request(options)
    .then(function (response) {
      burn = response.data[1].total_calories;
      res.status(200).send(response.data[1]);
    })
    .catch(function (error) {
    console.error("BIG FAIL");
    res.sendStatus(500);
  });

})

router.post('/caloriesBurned', (req, res) => {
  console.log(req.body);
  const { activity, weight, duration } = req.body;
  const newCB = new CaloriesBurned({
    workout: activity,
    currentWeight: weight,
    duration: duration,
    caloriesBurned: burn
  })
  newCB.save();
})


module.exports = router;

