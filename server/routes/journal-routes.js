const router = require('express').Router();
const { Journal } = require('../db/index.js');


// This will save a specific journal entry on selected date into the database
router.post('/', (req, res) => {
    const {entry, date} = req.body;
// If it exists in the database, just update it
Journal.findOneAndUpdate({date: date}, {entry: entry})
    .then((entryBody) => {
 // If this journal entry already exists in the database, just update the entry 
        if (entryBody) {
            res.sendStatus(200);
  // If it does not exist in the database, create a new document for it 
        } else {
            Journal.create({entry: entry, date: date});
        }
    })
    // If entering the database was not successful, send back a 500 status code
    .catch(() => {
        res.sendStatus(500);
    })
})



//This will retrieve the specific journal entry from this date from the database 
router.get('/:date/', (req, res) => {
    
})

module.exports = router;