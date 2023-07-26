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
router.get('/feed/public', (req, res) => {
  Journal.find()
    .then((entries) => res.send(entries))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 4. GET - View Following Only Feed
router.get('/feed/following', (req, res) => {
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

// 5. POST - Like a Journal Entry
router.post('/interact/:journalId/like', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(journalId, { $addToSet: { likes: _id } })
    .then(() => {
      // Notify the journal owner about the like
      const notification = new Notification({
        user: journalEntry.user,
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

// 6. POST - Unlike a Journal Entry
router.post('/interact/:journalId/unlike', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(journalId, { $pull: { likes: _id } })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 7. POST - Repost a Journal Entry
router.post('/interact/:journalId/repost', (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  Journal.findByIdAndUpdate(journalId, { $addToSet: { reposts: _id } })
    .then(() => {
      // Notify the journal owner about the repost
      const notification = new Notification({
        user: journalEntry.user,
        journalEntry: journalId,
        type: 'repost',
      });
      notification.save();
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 8. POST Unrepost a Journal Entry
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

// 9. Get User Notifications
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
