const router = require('express').Router();
const { User, CaloriesIn, CaloriesBurned, Workout, Journal } = require('../db/index.js');
const moment = require('moment');

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect('/auth/login');
  } else {
    // if logged in
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('/home', { user: req.user });
})


// This will RETRIEVE the specific users name, so it can appear on the dashboard
router.get('/user', (req, res) => {
  const { googleId } = req.user;
  User.find({ googleId: googleId })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error('Failed to get user:', err);
      res.sendStatus(500);
    });
})

router.get('/caloriesIn', (req, res) => {
  const { _id } = req.user
  const date = moment().format("YYYY-MM-DD")
  CaloriesIn.find({ date: date, user: _id })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get('/caloriesBurned', (req, res) => {
  const { _id } = req.user
  const date = moment().format("YYYY-MM-DD")
  CaloriesBurned.find({ date: date, user: _id })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

router.get('/workouts', (req, res) => {
  const { _id } = req.user
  const date = moment().format("YYYY-MM-DD")
  Workout.find({ date: date, user: _id })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router;
