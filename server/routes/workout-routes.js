const router = require('express').Router();
const axios = require('axios');
const { Exercise } = require('../db/index.js');

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

router.post('/exercises', (req, res) => {
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



  module.exports = router;
