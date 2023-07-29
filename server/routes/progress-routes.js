const router = require('express').Router();
const { Progress } = require('../db/index.js');

// GET handler to all Progress from the DB // FOR TESTING
router.get('/', (req, res) => {
  Progress.find({})
    .then((progress) => {
      res.status(200).send(progress);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// POST handler to save or update Progress in the DB
router.post('/', (req, res) => {
  // get id from user
  const { _id } = req.user;
  // get totalCaloriesBurned and updatedWeight from request body
  const { lineDataCalories, pieDataCalories, lineDataWeight, pieDataWeight } = req.body;
  console.log('req body', req.body);
  // use mongoose model method to save Progress for specific user
  Progress.findOneAndUpdate(
    { user: _id },
    {
      lineDataCalories: lineDataCalories,
      pieDataCalories: pieDataCalories,
      lineDataWeight: lineDataWeight,
      pieDataWeight: pieDataWeight,
    }
  )
    .then((user) => {
      if (user) {
        console.log('SUCCESS in UPDATE Progress for this user');
        res.sendStatus(200);
      } else {
        Progress.create({
          user: _id,
          lineDataCalories: lineDataCalories,
          pieDataCalories: pieDataCalories,
          lineDataWeight: lineDataWeight,
          pieDataWeight: pieDataWeight,
        });
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.error('FAILED to send Progress Post request:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
