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
  CaloriesIn.findOneAndUpdate({ user: _id, date: date }, { foodList: foodList })
    .then((document) => {
      if (document) {
        res.sendStatus(200);
      } else {
        CaloriesIn.create({ foodList: foodList, user: _id, date: date });
      }
    })
    .catch((err) => {
      console.err('Failed to POST to db', err);
      res.sendStatus(500);
    })
  // const newCalorie = new CaloriesIn({
  //   foodList: foodList,
  //   date: date,
  //   user: _id
  // });
  // newCalorie.save();
  // res.sendStatus(201);
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
router.delete('/food/:date', (req, res) => {
  const { date } = req.params;
  const { _id } = req.user;

  CaloriesIn.findOneAndRemove({ user: _id, date: date })
    .then(entry => {
      if (entry) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      console.error('Failed to delete from db:', err);
      res.sendStatus(500);
    })
})

module.exports = router;
