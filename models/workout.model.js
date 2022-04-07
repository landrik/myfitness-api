const mongoose = require('mongoose');
const schema = mongoose.Schema;


const WorkoutSchema = new schema({
  day:{type: Date, default: Date.now},
  exercises: [{
    type:{
        type: String,
        required: [true, "Choose a workout option"]
    },
    name:{
        type: String,
        required: [true, "What is the workout name?"]
    },
    duration:{
        type: Number,
        required: [true, "How many minutes do you want to workout?"]
    },
    weight:{
        type: Number,
        required:[true, "What is the desired weight?"]
    },
    reps:{
        type: Number,
        required:[true, "How many reps do you want to do?"]
    },
    sets:{
        type: Number,
        required:[true, "How many sets do you want to do?"]
    }
  }]
})

module.exports = mongoose.model('workout', WorkoutSchema);


