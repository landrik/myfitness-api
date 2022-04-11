const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const uniqueValidator = require('mongoose-unique-validator');
// const crypto = require('crypto');
// const { v1: uuidv1 } = require('uuid');
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
      password: {
        type:String,
        required: true,
      },
      about:{
        type:String,
      },
      dateOfBirth:{
        type: Date,
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
      isAdmin: {type: Boolean, default: false},
    },
  { timestamps: true}
);


// //virtual fields
// UserSchema.virtual('password')
//   .set(function(password){
//     this._password = password
//     this.salt = uuidv1()
//     this.hashed_password = this.encryptPassword(password)
//   })
//   .get(function(){
//     return this._password
//   })

// UserSchema.methods = {
//   authenticate: function(plainText){
//     return this.encryptPassword(plainText) === this.hashed_password;
//   },
//   encryptPassword: function(password){
//     if(!password) return '';
//     try {
//       return crypto.createHmac('sha1', this.salt)
//                     .update(password)
//                     .digest("hex")
//     } catch (error) {
//       return ''
      
//     }
//   }
// }  

UserSchema.method('toJSON', function(){
  const { __v, ...object } = this.toObject();
  const { _id:id, ...result } = object;
  return { ...result, id };
});

// Hashes password automatically
UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// Apply the uniqueValidator plugin to userSchema.
//UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('user', UserSchema);


