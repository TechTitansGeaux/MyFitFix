const router = require('express').Router();
const axios = require('axios');
const { Exercise, Workout } = require('../db/index.js');
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
// This allows you to post an exercise into the db
router.post('/exercise', (req, res) => {
const { name, type, muscle, equipment, difficulty, instructions } = req.body;
//console.log(req, 'routes, hi');
Exercise.create({
  name: name,
  type: type,
  muscle: muscle,
  equipment: equipment,
  difficulty: difficulty,
  instructions: instructions,
  sets: 0,
  reps: 0
})
.then((data) => {
  //console.log("saved to db:", data);
  res.sendStatus(201);
})
.catch((err)=>{
  //console.error("failed to save to db:", err)
  res.sendStatus(500);
})
})
// this gets all saved exercises from the db
router.get('/workout', (req, res) => {
  //console.log(req, 'routes, hi');
  Exercise.find({})
  .then((exerciseObj) => {
    //console.log("retrieved from db:", exerciseObj);
    res.status(200).send(exerciseObj)
  })
  .catch((err)=>{
    //console.error("failed to retrieve from db:", err)
    res.sendStatus(500);
  })
  })
//this grabs a single exercise from the db with the request param being the name property
  router.get('/workout/name', (req, res) => {
    //console.log(req, 'routes, hi');
    const { name } = req.params
    Exercise.findOne({name: name})
    .then((obj) => {
      //console.log("retrieved from db:", exerciseObj);
      res.status(200).send(obj)
    })
    .catch((err)=>{
      //console.error("failed to retrieve from db:", err)
      res.sendStatus(500);
    })
    })
//this allows you to post a daily workout entry
    router.post('/workouts', (req, res) => {
    const { workoutArr } = req.body;
    Workout.create({ workoutArr })
    .then((dataArr) => {
      console.log("saved to db:", dataArr);
      res.sendStatus(201);
    })
    .catch((err)=>{
      console.error("failed to save to db:", err)
      res.sendStatus(500);
    })
  });

  module.exports = router;
