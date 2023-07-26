const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const mongoUri = 'mongodb://127.0.0.1:27017/fitfix';
mongoose.connect(mongoUri)
  .then(() => console.info(('Connected to database: "fitfix"')))
  .catch((err) => console.error(('Could not connect to database'), err));

  const UserSchema = new Schema({
    name: String,
    googleId: { type: String, unique: true },
    thumbnail: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    journalEntries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Journal' }],
  });
  


const CaloriesInSchema = new Schema({
  foodList: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String
})

const CaloriesBurnedSchema = new Schema({
  workout: String,
  currentWeight: {type: Number, required: true },
  duration: {type: Number, required: true },
  caloriesBurned: Number,
  date: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


const WorkoutEntrySchema = new Schema({
exercise: {type: Array, unique: true },
date: String,
user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const JournalEntrySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entry: String,
  images: [{ type: String }],
  date: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  interactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const NotificationSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  journalEntry: { type: mongoose.Schema.Types.ObjectId, ref: 'Journal' },
  type: String, //  type of interaction (e.g., 'like', 'repost')
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});




module.exports = {
  User: model('User', UserSchema),
  CaloriesIn: model('CaloriesIn', CaloriesInSchema),
  CaloriesBurned: model('CaloriesBurned', CaloriesBurnedSchema),
  Workout: model('Workout', WorkoutEntrySchema),
  Journal: model('Journal', JournalEntrySchema),
  Notification: model('Notification', NotificationSchema)
};
