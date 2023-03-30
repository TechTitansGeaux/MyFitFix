const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const { User, Entries, CaloriesIn, CaloriesBurned } = require('../db/index.js');

//Start variable to set to incoming caloriesBurned number from the API.
//Set it outside th GET and Axios functions so it's not limited by function scope.
let burn = 0;

router.get('/caloriesBurned', (req, res) => {

  const { activity, weight, duration } = req.query;

  const options = {
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/caloriesburned',
    params: { activity: activity, weight: weight, duration: duration },
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

//POST to the DB. Includes activity (weight lifting - light) current weight, duration,
//# calories burned, and date
router.post('/caloriesBurned', (req, res) => {
  // console.log('HELLOO', req.user);
  const { activity, weight, duration, date } = req.body;

  const newCB = new CaloriesBurned({
    workout: activity,
    currentWeight: weight,
    duration: duration,
    caloriesBurned: burn,
    date: date
  })
  newCB.save()
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Failed to POST', err);
      res.sendStatus(500);
    })
})

router.get('/caloriesBurned/:date', (req, res) => {
  const { date } = req.params;
  // console.log(req)
  CaloriesBurned.find({ date: date })
    .then((dailyEntry) => {
      console.log('Successful GET', dailyEntry);
      if (dailyEntry) {
        res.status(200).send(dailyEntry);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.log('Failed GET', err);
      res.sendStatus(500);
    })
})


// router.put('/caloriesBurned/:date', (req, res) => {
//   console.log('WHAT????', req.params)
//   .then((data) => {
//     console.log('Successful GET', data);
//     res.sendStatus(200);
//   })
//   .catch((err) => {
//     console.log('Failed GET', err);
//     res.sendStatus(500);
//   })
// })







// CaloriesBurned.replaceOne({ date: date }, {
//   workout: activity,
//   currentWeight: weight,
//   duration: duration,
//   CaloriesBurned: burn,
//   date: date
// },
// { upsert: true })
//   .then(() => {
//     // console.log('Sucessfully CREATED a catergory', category);
//     res.sendStatus(201);
//   })
//   .catch((err) => {
//     console.log('Failed to CREATE a category', err);
//     res.sendStatus(500);
//   });


module.exports = router;

