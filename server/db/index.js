const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const mongoUri = 'mongodb://127.0.0.1:27017/fitflex';
mongoose.connect(mongoUri)
  .then(() => console.info(('Connected to database: "fitflex"')))
  .catch((err) => console.error(('Could not connect to database'), err));

const UserSchema = new Schema({
  name: String,
  dailyEntryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entries' }
});

const DailyEntrySchema = new Schema({
  caloriesIn: { type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesIn' },
  caloriesBurned: { type: mongoose.Schema.Types.ObjectId, ref: 'CaloriesBurned' },
  journal: String,
  date: { type: Date, unique: true, required: true }
});

const CaloriesInSchema = new Schema({
  foodItem: String,
  weightInGrams: Number,
  calories: Number,
})

const CaloriesBurnedSchema = new Schema({
  workout: String,
  currentWeight: Number,
  duration: Number
});

const JournalEntrySchema = new Schema({
  entry: String,
  date: {type: Date, unique: true}
});



module.exports = {
  User: model('User', UserSchema),
  Entries: model('Entries', DailyEntrySchema),
  CaloriesIn: model('CaloriesIn', CaloriesInSchema),
  CaloriesBurned: model('CaloriesBurned', CaloriesBurnedSchema),
  Journal: model('Journal', JournalEntrySchema)
};