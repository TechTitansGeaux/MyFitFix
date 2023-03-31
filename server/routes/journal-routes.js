const router = require('express').Router();
const { Journal } = require('../db/index.js');


// This will SAVE journal entry on selected date into the database
router.post('/', (req, res) => {
    const {entry, date} = req.body;
    const { _id } = req.user
    Journal.findOneAndUpdate({user: _id, date: date}, {entry: entry})
        .then((entryBody) => {
    // If this journal entry already exists in the database, just update the entry 
            if (entryBody) {
                res.sendStatus(200);
    // If it does not exist in the database, create a new document for it 
            } else {
                Journal.create({user: _id, entry: entry, date: date});
            }
    })
        // If entering the database was not successful, send back a 500 status code
        .catch(() => {
            res.sendStatus(500);
    })
})



// This will RETRIEVE the specific journal entry from this date from the database 
router.get('/:date', (req, res) => {
    const { date } = req.params;
    const { _id } = req.user

        Journal.find({user: _id, date: date})
            .then((entry) => {
                // If the entry exists, send the journal entry back 
                if (entry) {
                    res.send(entry); 
                } 
            })
            .catch((err) => {
                res.sendStatus(500);
            })
})

// This will DELETE the specific journal entry from the date from the database 
router.delete('/:date', (req, res) => {
    const { date } = req.params;
    const { _id } = req.user;

        Journal.findOneAndRemove({user: _id, date: date})
            .then((entry) => {
                // If the entry exists, delete the journal entry  
                if (entry) {
                    res.sendStatus(200)
                // If the entry does not exist, it cannot be found and cannot be deleted 
                } else {
                    res.sendStatus(404)
                }
            })
            .catch((err) => {
                res.sendStatus(500);
            })
})



module.exports = router;