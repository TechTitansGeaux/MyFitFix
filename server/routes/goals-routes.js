const router = require('express').Router();
const {
  User,
  Goals,
  CaloriesIn,
  CaloriesBurned,
  Workout,
  Journal,
} = require("../db/index.js");

// GET Goals from the DB
router.get('/', (req, res) => {
  // res.send({ msg: 'GET test in postman' }); OK in postman
})

// POST Goals and save to the DB
router.post("/", (req, res) => {
  // res.send({ msg: "POST test in postman" }); OK in postman
});


// STRETCH // UPDATE Goals in DB
module.exports = router;