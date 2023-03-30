const router = require('express').Router();
const axios = require('axios');
const { Workout } = require('../db/index.js');
//this is an api call to get the exercises data from the API
router.get('/exercise', (req, res) => {
 const { muscle } = req.query;
    const options = {
      method: 'GET',
      url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
      params: {muscle: muscle},
      headers: {
        'X-RapidAPI-Key': '6a0b1c8aa1msh39014e152c65916p14ced2jsn51e6c32bd8f2',
        'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
      }
    };
    axios.request(options)
    .then((response) => {
     // console.log(response);
      res.status(200)
      res.send(response.data);
    }).catch((error) => {
      //console.error('failed to get:', error);
      res.sendStatus(500);
    });

  })

//this allows you to post a daily workout entry
    router.post('/workouts', (req, res) => {
    const { workoutArr, currDate } = req.body;
    const { _id } = req.user;

    const newWorkouts = new Workout({
      exercise: workoutArr,
      date: currDate,
      user: _id
    }).save()
    .then((dataArr) => {
      //console.log("saved to db:", dataArr);
      res.sendStatus(201);
    })
    .catch((err)=>{
      //console.error("failed to save to db:", err)
      res.sendStatus(500);
    })
  });

  // this allows you to get a specific workout entry from a specific date
  router.get('/workouts/date', (req, res) => {
    //console.log(req, 'routes, hi');
    const { date } = req.params
    Workout.findOne({date})
    .then((workoutObj) => {
      //console.log("retrieved from db:", workoutObj);
      res.status(200).send(workoutObj)
    })
    .catch((err)=>{
      //console.error("failed to retrieve from db:", err)
      res.sendStatus(500);
    })
    })

  router.put('/update', (req, res) => {
    // console.log(req.body);
    const { reps, set, name , date } = req.body;
    const { _id } = req.user;

    Workout.find({ user: _id, date: date })
      .then()
  })


  module.exports = router;
