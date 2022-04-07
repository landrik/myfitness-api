const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.sayHi = (req, res) => {
  res.json({ message: 'Hello from Node, who is you !'});
}

//Create and Save new user
exports.create = (req, res) => {}

//Retrieve and redturn all users from database
exports.findAll = (req, res) => {}

//Find a single user with userId
exports.findOne = (req, res) => {}

//Update a user identified by a userId in the request
exports.update = (req, res) => {}

//Delete a user identified by a userId in the request
exports.delete = (req, res) => {}


