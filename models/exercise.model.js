const mongoose = require('mongoose');
const schema = mongoose.Schema;


const ExerciseSchema = new schema({
  exerciseName:{
      type: String,
      required: [true, "What is the exercise name?"]
  },
  exerciseDescription:{
    type: String,
    required: [true, "What is the exercise desciption?"]
  },
})

module.exports = mongoose.model('exercise', ExerciseSchema);


