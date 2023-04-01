const router = require('express').Router();
const { User } = require('../db/index.js');

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
  console.log(req.user);
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

router.get('/calorieIn', (req, res) => {

})

router.get('/caloriesBurned', (req, res) => {

})

router.get('/workout', (req, res) => {

})

module.exports = router;
