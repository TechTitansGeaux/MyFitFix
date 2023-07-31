const router = require('express').Router();
const { User, Journal, Notification } = require('../db/index.js');

// 1. POST - Follow a User
router.post('/follow/:userId', (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { $addToSet: { following: userId } })
    .then(() => {
      User.findByIdAndUpdate(userId, { $addToSet: { followers: _id } })
        .then(() => res.sendStatus(200))
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 2. POST - Unfollow a User
router.post('/unfollow/:userId', (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { $pull: { following: userId } })
    .then(() => {
      User.findByIdAndUpdate(userId, { $pull: { followers: _id } })
        .then(() => res.sendStatus(200))
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 3. GET - View Public Feed
router.get('/public', (req, res) => {
  Journal.find()
    .then((entries) => res.send(entries))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 4. GET - View Following Only Feed
router.get('/following', (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .populate('following', '-_id') // Exclude _id from the populated users
    .then((user) => {
      const followingIds = user.following.map((user) => user._id);
      Journal.find({ user: { $in: followingIds } })
        .then((entries) => res.send(entries))
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 5. POST - Post a Journal Entry to the Feed
router.post('/post-journal', (req, res) => {
  const { entry, images } = req.body;
  const { _id } = req.user;

  Journal.create({ user: _id, entry: entry, images: images })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 6. POST - Like a Journal Entry
router.post('/like/:journalId', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(
    journalId,
    {
      $addToSet: { interactions: _id }, // Add the user ID to the interactions array
      $inc: { likes: 1 }, // Increment the likes field by 1
    },
    { new: true } // This option returns the updated journal entry
  )
    .then((updatedEntry) => {
      if (!updatedEntry) {
        return res.status(404).json({ error: 'Journal entry not found.' });
      }

      // Notify the journal owner about the like
      const notification = new Notification({
        user: updatedEntry.user,
        journalEntry: journalId,
        type: 'like',
      });
      notification.save();

      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


// 7. POST - Unlike a Journal Entry
router.post('/unlike/:journalId/', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(
    journalId,
    { $pull: { likes: _id } }, // Remove the user ID from the likes array
    { new: true } // This option returns the updated journal entry
  )
    .then((updatedEntry) => {
      if (!updatedEntry) {
        return res.status(404).json({ error: 'Journal entry not found.' });
      }

      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});


// 8. POST - Repost a Journal Entry
router.post('/repost/:journalId', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(journalId, { $addToSet: { reposts: _id }, $addToSet: { interactions: _id } }) // Add the user ID to interactions array
    .then(() => {
      // Notify the journal owner about the repost
      Journal.findById(journalId)
        .then((journalEntry) => {
          if (journalEntry) {
            const notification = new Notification({
              user: journalEntry.user,
              journalEntry: journalId,
              type: 'repost',
            });
            notification.save();
          }
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 9. POST - Unrepost a Journal Entry
router.post('/interact/:journalId/unrepost', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(journalId, { $pull: { reposts: _id } })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 10. Get User Notifications
router.get('/notifications', (req, res) => {
  const { _id } = req.user;

  Notification.find({ user: _id })
    .populate('journalEntry', 'entry')
    .then((notifications) => res.send(notifications))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

module.exports = router;
