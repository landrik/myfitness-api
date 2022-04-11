import { Router } from 'express';
 
//Express route
const router = Router();
const express = require('express');
const multer = require('multer');

const users = require('../controllers/user.controller');

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


//signout user
//router.post('/', signout);


//get all users
router.get('/', users.findAll);
 
//get a single user
router.get('/:userId', users.findOne);

//add a new user
router.post('/', users.create);

//update a single user
router.put('/:userId', uploadOptions.single('image'), users.update);

//signup user
router.post('/register', users.signup);
//signin user
router.post('/login', users.signin);

//remove a single user
router.delete('/:userId', users.delete);
 
module.exports = router;