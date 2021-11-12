const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for the exercise:",
  },
  exercise: {
    type: String,
    trim: true,
    required: "What type of exercise is this?",
  },
  weight: {
    type: Number,
    required: "What weight are you using?",
  },
  sets: {
    type: Number,
    required: "How many sets are you doing?",
  },
  reps: {
    type: Number,
    required: "How many reps are you doing?",
  },
  duration: {
    type: Number,
    required: "What is the total duration of the workout?",
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
