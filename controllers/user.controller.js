const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbErrorHandler');


const req = require('express/lib/request');
const multer = require('multer');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');

    if(isValid){
      uploadError = null
    }

    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ 
  storage: storage
})

//Create and Save new user
exports.create = async (req, res) => {
  const file = req.file;
  if(!file) return res.status(400).send('No image found in the request!')

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

  let user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    weight: req.body.weight,
    height: req.body.height,
    about: req.body.about,
    photo: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
  });

  user = await user.save();

  if(!user){
    return res.status(400).send('the user cannot be created!')
  }

  res.send(user)
}

//Retrieve and return all users from database
exports.findAll = async (req, res) => {
  //res.send('GET all exercises')
  try {
    const users = await User.find()

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
    
  }
}

//Find a single user with userId
exports.findOne = async(req, res)=>{
  const user = await User.findById(req.params.userId)

  if(!user){
    res.status(500).json({message: 'the user with the given ID was not found!'})
  }

  res.status(200).send(user)
}

//Update a user identified by a userId in the request
exports.update = async (req, res)=>{
  const  userExist = await User.findById(req.params.userId);
  let newPassword
  if(req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10)
  } else {
      newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    {
      username: req.body.username,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      about: req.body.about,
      photo: req.body.photo
    },
    {new: true}
  )

  if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);


}

//Delete a user identified by a userId in the request
exports.delete = async(req, res)=>{
  const id = req.params.userId;
  console.log('id from backend', userId);

  try {
    const user = await User.findByIdAndRemove({ _id: id })
    console.log(user)

    if(!user){
      res.status(404).json({success: false, message: 'this user has not been found!'})
    }else{
      res.status(200).json({success: true, message: 'this user has been deleted!'})
    }
    
  } catch (err) {
    console.log(err)
    res.status(400).json({success: false, error: err})
  }
}


exports.signin = async(req, res) => {
  //find user based on email
  const {email, password} = req.body
  await User.findOne({email}, (err, user)=>{
    if(err || !user){
      return res.status(400).json({ 
        err: 'User with that email does not exit, please signup'
      })
    }
    //if user is found make user the email and password match
    //create authenticate method in user method
    if(!user.authenticate(password)){
      return res.status(401).json({
        err: 'Email and password don\'t match'
      })
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({_id: user._id}, process.env.SECRET);
    //persist the token as 't' in cookies with expiry date
    res.cookie('t', token, {expire:new Date() + 9999})
    //return repsonse with user and token to fron client
    //console.log(data);
    const {_id, fullName, email, isAdmin} = user;
    return res.json({ token, user: {_id, email, fullName, isAdmin}})
  })
}

//Signup a new user
exports.signup = async (req, res) => {
  const user = new User(req.body);
  await user.save((err, user) => {
    if(err){
      return res.status(400).json({ 
        err: errorHandler(err)
      })
    }
    user.salt = undefined;
    user.hashedPassword = undefined;
    res.json({
      user
    })
  })
}

