const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const schema = mongoose.Schema;


const UserSchema = new schema(
    {
      fullName: {
        type:String,
        trim: true,
        required: true,
        maxlength: 32
      },
      email: {
        type:String,
        unique:true,
        trim: true,
        required: true,
        maxlength: 32
      },
      hashedPassword: {
        type:String,
        required: true,
      },
      about:{
        type:String,
      },
      dateOfBirth:{
        type: Date,
        default: Date.now
      },
      height:{
        type: Number,
        default: 0
      },
      weight:{
        type: Number,
        default: 0
      },
      photo:{},
      history:{
        type: Array,
        default: []
      },
      isAdmin: {type: Boolean, default: false},
      salt: { type: String, required: true }
    },
  { timestamps: true}
);


//virtual fields
UserSchema.virtual('password')
  .set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashedPassword = this.encryptPassword(password)
  })
  .get(function(){
    return this._password
  })

UserSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashedPassword;
  },
  encryptPassword: function(password){
    if(!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt)
                    .update(password)
                    .digest("hex")
    } catch (error) {
      return ''
    }
  }
}  

UserSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  const { _id:id, ...result } = object;
  return { ...result, id };
});

module.exports = mongoose.model('user', UserSchema);


