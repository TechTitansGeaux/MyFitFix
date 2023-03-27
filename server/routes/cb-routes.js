const router = require('express').Router();
const axios = require('axios');
const { User, Entries, CaloriesIn, CaloriesBurned } = require('../db/index.js');


router.get('/caloriesBurned', (req, res) => {
// console.log(req);

  const options = {
    method: 'GET',
    url: 'https://calories-burned-by-api-ninjas.p.rapidapi.com/v1/caloriesburned',
    params: {activity: 'lifting', weight: weight, duration: duration},
    headers: {
      'X-RapidAPI-Key': '2cbdb847d2mshd5b48913e0fb840p1e26a6jsnb4b7f045b962',
      'X-RapidAPI-Host': 'calories-burned-by-api-ninjas.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

})

module.exports = router;

