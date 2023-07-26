const express = require('express');
const router = express.Router();
const { User, Notification } = require('../db/index.js');

// Route for searching users
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.find({ username: { $regex: query, $options: 'i' } });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for following a user
router.post('/follow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user; // Assuming the authenticated user's ID is available in req.user

  try {
    const userToFollow = await User.findById(userId);
    if (!userToFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userId === _id) {
      return res.status(400).json({ error: 'You cannot follow yourself' });
    }

    if (userToFollow.followers.includes(_id)) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    userToFollow.followers.push(_id);
    await userToFollow.save();

    const currentUser = await User.findById(_id);
    currentUser.following.push(userId);
    await currentUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route for unfollowing a user
router.post('/unfollow/:userId', async (req, res) => {
  const { userId } = req.params;
  const { _id } = req.user; // Assuming the authenticated user's ID is available in req.user

  try {
    const userToUnfollow = await User.findById(userId);
    if (!userToUnfollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userId === _id) {
      return res.status(400).json({ error: 'You cannot unfollow yourself' });
    }

    if (!userToUnfollow.followers.includes(_id)) {
      return res.status(400).json({ error: 'You are not following this user' });
    }

    userToUnfollow.followers.pull(_id);
    await userToUnfollow.save();

    const currentUser = await User.findById(_id);
    currentUser.following.pull(userId);
    await currentUser.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get follower/following count for a user
router.get('/followers-following/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const followerCount = user.followers.length;
    const followingCount = user.following.length;

    res.json({ followerCount, followingCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get User Notifications
router.get('/notifications', async (req, res) => {
  const { _id } = req.user; // Assuming the authenticated user's ID is available in req.user

  try {
    const notifications = await Notification.find({ user: _id }).populate('journalEntry', 'entry');
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
