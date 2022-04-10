const { response } = require('express');
const Exercise = require('../models/exercise.model');

/**
 * @desc   Get all exercises
 * @route  POST /exercises 
 * @access Public 
 */

exports.findAll = async(req, res, next) => {
  //res.send('GET all exercises')
  try {
    const exercises = await Exercise.find()

    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
    
  }
}

/**
 * @desc   Add exercise
 * @route  POST /exercises 
 * @access Public 
 */

exports.create = async( req, res, next) => {
  //res.send('POST single exercise')
  try {
    const { type, name, description } = req.body

    const exercise = await Exercise.create(req.body)

    return res.status(201).json({
      success: true,
      data: exercise
    })
  } catch (error) {
    //console.log(error)
    if( error.name === 'ValidationError' ){
      const messages =  Object.values(error.errors).map(val => val.message)
      return res.status(400).json({
        success:false,
        error: messages
      })
    }else{
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

/**
 * @desc   Delete exercise
 * @route  DELETE /exercises/:id 
 * @access Public 
 */
exports.delete = async (req, res, next) => {
  //res.send('DELETE a single exercise')
  try {
    const exercise = await Exercise.findById(req.params.id);

    if(!exercise){
      return res.status(404).json({
        success: false,
        error: 'No exercise were found'
      })
    }
    
    await exercise.remove()

    return res.status(200).json({
      success: true,
      data: {}
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}



