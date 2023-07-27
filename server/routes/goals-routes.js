const router = require('express').Router();
const {
  User,
  Goals,
  CaloriesIn,
  CaloriesBurned,
  Workout,
  Journal,
} = require("../db/index.js");

// GET handler to all Goals from the DB // FOR TESTING
router.get('/', (req, res) => {
  Goals.find({})
    .then((goals) => {
      res.status(200).send(goals);
    })
    .catch((err) => {
      res.sendStatus(500);
  })
})

// GET handler to retrieve Goals of a current user from the DB
router.get('/', (req, res) => {
})

// POST handler to save or update goals in the DB
router.post("/", (req, res) => {
  // get id from user
  const { _id } = req.user;
  // get goalCaloriesBurned and goalWeight from request body
  const { goalCaloriesBurned, goalWeight } = req.body;
  console.log('req body', req.body)
  // use mongoose model method to save goals for specific user
  Goals.findOneAndUpdate({ user: _id }, {
    goalCaloriesBurned: goalCaloriesBurned,
    goalWeight: goalWeight
  })
    .then((user) => {
      if (user) {
        console.log("SUCCESS in UPDATE Goals for this user");
        res.sendStatus(200);
      } else {
        Goals.create({
          user: _id,
          goalCaloriesBurned: goalCaloriesBurned,
          goalWeight: goalWeight,
        });
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error("FAILED to send Goals Post request:", err);
      res.sendStatus(500);
    });
});


// UPDATE Goals in DB for totalCaloriesBurned and updatedWeight

module.exports = router;
