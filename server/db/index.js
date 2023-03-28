const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const mongoUri = 'mongodb://127.0.0.1:27017/fitflex';
mongoose.connect(mongoUri)
  .then(() => console.info(('Connected to database: "fitflex"')))
  .catch((err) => console.error(('Could not connect to database'), err));

const UserSchema = new Schema({
  name: String,
  dailyEntryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Entries', default: null }
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const CaloriesBurnedSchema = new Schema({
  workout: String,
  currentWeight: Number,
  duration: Number,
  caloriesBurned: Number,
  date: { type: Date, unique: true, required: true }
});

const ExerciseSchema = new Schema({
    name: {type: String, unique: true},
    type: String,
    muscle: String,
    equipment: String,
    difficulty: String,
    instructions: String,
    sets: Number,
    reps: Number
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
  Exercise: model('Exercise', ExerciseSchema),
  Journal: model('Journal', JournalEntrySchema)
};
