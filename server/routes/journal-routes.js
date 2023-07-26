const router = require('express').Router();
const { Journal, User, Notification } = require('../db/index.js');

// This will SAVE journal entry on the selected date into the database
router.post('/', async (req, res) => {
  const { entry, date, images } = req.body;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findOneAndUpdate(
      { user: _id, date: date },
      { entry: entry, images: images },
      { upsert: true, new: true }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// This will RETRIEVE the specific journal entry from this date from the database
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findOne({ user: _id, date: date });

    if (journalEntry) {
      res.send(journalEntry);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// This will DELETE the specific journal entry from the date from the database
router.delete('/:date', async (req, res) => {
  const { date } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findOneAndRemove({ user: _id, date: date });

    if (journalEntry) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Like a Journal Entry
router.post('/interact/:journalId/like', async (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findById(journalId);

    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    if (journalEntry.likes.includes(_id)) {
      return res.status(400).json({ error: 'You have already liked this journal entry' });
    }

    journalEntry.likes.push(_id);
    await journalEntry.save();

    // Notify the journal owner about the like
    const notification = new Notification({
      user: journalEntry.user,
      journalEntry: journalId,
      type: 'like',
    });
    await notification.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Unlike a Journal Entry
router.post('/interact/:journalId/unlike', async (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findById(journalId);

    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    if (!journalEntry.likes.includes(_id)) {
      return res.status(400).json({ error: "You haven't liked this journal entry" });
    }

    journalEntry.likes.pull(_id);
    await journalEntry.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Repost a Journal Entry
router.post('/interact/:journalId/repost', async (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findById(journalId);

    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    if (journalEntry.reposts.includes(_id)) {
      return res.status(400).json({ error: 'You have already reposted this journal entry' });
    }

    journalEntry.reposts.push(_id);
    await journalEntry.save();

    // Notify the journal owner about the repost
    const notification = new Notification({
      user: journalEntry.user,
      journalEntry: journalId,
      type: 'repost',
    });
    await notification.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Unrepost a Journal Entry
router.post('/interact/:journalId/unrepost', async (req, res) => {
  const { journalId } = req.params;
  const { _id } = req.user;

  try {
    const journalEntry = await Journal.findById(journalId);

    if (!journalEntry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    if (!journalEntry.reposts.includes(_id)) {
      return res.status(400).json({ error: "You haven't reposted this journal entry" });
    }

    journalEntry.reposts.pull(_id);
    await journalEntry.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// Convert Speech to Text for Journal Entry
router.post('/speech-to-text', (req, res) => {
  const { speech } = req.body;
  // speech-to-text processing logic here
  res.send({ text: speech });
});

module.exports = router;
