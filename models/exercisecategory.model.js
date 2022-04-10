const mongoose = require('mongoose');
const schema = mongoose.Schema;

const BodypartSchema = mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: [true, "What is the exercise name?"]
  }
})

BodypartSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  const { _id:id, ...result } = object;
  return { ...result, id };
});

module.exports = mongoose.model('bodypart', BodypartSchema);




