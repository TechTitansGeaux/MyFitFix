const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const mongoUri = 'mongodb://127.0.0.1:27017/fitflex';
mongoose.connect(mongoUri)
  .then(() => console.info(('Connected to database: "fitflex"')))
  .catch((err) => console.error(('Could not connect to database'), err));

const UserSchema = new Schema({
  name: String,
  dailyEntryId: {type: mongoose.Schema.Types.ObjectId, ref: 'Entries'},
  googleId: { type: String, unique: true, required: true },
  thumbnail: String
});

const DailyEntrySchema = new Schema({
  CaloriesIn: Number,
  CaloriesBurned: Number,
  Journal: String,
  Date: { type: Date, unique: true, required: true },

});

module.exports = {
  User: model('User', UserSchema),
  Entries: model('Entries', DailyEntrySchema),
};