const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const mongoUri = 'mongodb://127.0.0.1:27017/fitflex';
mongoose.connect(mongoUri)
  .then(() => console.info(('Connected to database: "fitflex"')))
  .catch((err) => console.error(('Could not connect to database'), err));

const UserSchema = new Schema({
  name: String,
  googleId: { type: String, unique: true },
  thumbnail: String,
  dailyEntryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entries', default: null }
});

const DailyEntrySchema = new Schema({
  caloriesIn: { type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesIn' },
  caloriesBurned: { type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesBurned' },
  journal: String,
  date: { type: Date, unique: true, required: true }
});

const CaloriesInSchema = new Schema({
  foodList: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: String, unique: true, required: true }
})

const CaloriesBurnedSchema = new Schema({
  workout: String,
  currentWeight: Number,
  duration: Number,
  caloriesBurned: Number,
  date: { type: Date, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const WorkoutEntrySchema = new Schema({
exercise: {type: Array, unique:true },
date: {type: String, unique: true, required: true},
user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const JournalEntrySchema = new Schema({
  entry: String,
  date: { type: Date, unique: true }
});



module.exports = {
  User: model('User', UserSchema),
  Entries: model('Entries', DailyEntrySchema),
  CaloriesIn: model('CaloriesIn', CaloriesInSchema),
  CaloriesBurned: model('CaloriesBurned', CaloriesBurnedSchema),
  Workout: model('Workout', WorkoutEntrySchema),
  Journal: model('Journal', JournalEntrySchema)
};
