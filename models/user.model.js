const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
const schema = mongoose.Schema;


const UserSchema = new schema(
    {
      username: {
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
      hashed_password: {
        type:String,
        required: true,
      },
      about:{
        type:String,
      },
      age:{
        type: Number,
        default: 0
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
      salt:String
    },
  { timestamps: true}
);


//virtual fields
UserSchema.virtual('password')
  .set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function(){
    return this._password
  })

UserSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password;
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
// Apply the uniqueValidator plugin to userSchema.
//UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('user', UserSchema);


