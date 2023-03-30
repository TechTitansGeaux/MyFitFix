const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const { User, Entries, CaloriesIn, CaloriesBurned } = require('../db/index.js');
//const StevenHeErrorLogs = require('Steven He');

//Start variable to set to incoming caloriesBurned number from the API.
//Set it outside th GET and Axios functions so it's not limited by function scope.
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
    console.error("EMOTIONAL DAAAAMAGE");
    res.sendStatus(500);
  });

})

//POST to the DB. Includes activity (weight lifting - light) current weight, duration,
//# calories burned, and date
router.post('/caloriesBurned', (req, res) => {
  // console.log('HELLOO', req.user);
  const { activity, weight, duration, date } = req.body;
  console.log(req.body);

  CaloriesBurned.replaceOne({ date: date }, { activity: activity, currentWeight: weight, duration: duration, caloriesBurned: burn, date: date }, {upsert: true})
    .then(() => {
      console.log('Yay, we POSTed');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Sound like Unemplooyyment', err);
      res.sendStatus(500);
    })
})




router.get('/caloriesBurned/:date', (req, res) => {
  const { date } = req.params;
  // console.log(req)
  CaloriesBurned.find({date: date})
    .then((dailyEntry) => {
      // const { caloriesBurned } = dailyEntry[0];
      console.log('Successful GET', dailyEntry);
      // if(dailyEntry) {
        res.send(dailyEntry);
      // }
    })
    .catch((err) => {
      console.log('Failed GET', err);
      res.sendStatus(500);
    })
})





module.exports = router;

