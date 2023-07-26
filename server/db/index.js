const mongoose = require('mongoose');
const { Schema, model } = mongoose;
require('dotenv').config();

const mongoUri = "mongodb://127.0.0.1:27017/fitfix";
mongoose
  .connect(mongoUri)
  .then(() => console.info('Connected to database: "fitfix"'))
  .catch((err) => console.error("Could not connect to database", err));

const UserSchema = new Schema({
  name: String,
  googleId: { type: String, unique: true },
  thumbnail: String,
});

const GoalsSchema = new Schema({
  goalCaloriesBurned: Number,
  goalWeight: Number,
  totalCaloriesBurned: Number,
  updatedWeight: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},
{ timestamps: true });

const MessageSchema = new Schema({
  message: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
{ timestamps: true });

const CaloriesInSchema = new Schema({
  foodList: { type: Array, default: [] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
});

const CaloriesBurnedSchema = new Schema({
  workout: String,
  currentWeight: { type: Number, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: Number,
  date: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const WorkoutEntrySchema = new Schema({
  exercise: { type: Array, unique: true },
  date: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const JournalEntrySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  entry: String,
  date: { type: Date, unique: false },
});

module.exports = {
  User: model("User", UserSchema),
  GoalsSchema: model("Goals", GoalsSchema),
  MessageSchema: model('Messages', MessageSchema),
  CaloriesIn: model("CaloriesIn", CaloriesInSchema),
  CaloriesBurned: model("CaloriesBurned", CaloriesBurnedSchema),
  Workout: model("Workout", WorkoutEntrySchema),
  Journal: model("Journal", JournalEntrySchema),
};
