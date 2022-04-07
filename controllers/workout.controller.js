const { response } = require('express');
const Workout = require('../models/workout.model');

/**
 * @desc   Get all workouts
 * @route  POST /workouts 
 * @access Public 
 */

exports.findAll = async(req, res, next) => {
  //res.send('GET all workouts')
  try {
    const workouts = await Workout.find()

    return res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
    
  }
}

/**
 * @desc   Add workout
 * @route  POST /workouts 
 * @access Public 
 */

exports.create = async( req, res, next) => {
  //res.send('POST single workout')
  try {
    const { type, name, duration, weight, reps, sets } = req.body

    const workout = await Workout.create(req.body)

    return res.status(201).json({
      success: true,
      data: workout
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
 * @desc   Delete workout
 * @route  DELETE /workouts/:id 
 * @access Public 
 */
exports.delete = async (req, res, next) => {
  //res.send('DELETE a single workout')
  try {
    const workout = await Workout.findById(req.params.id);

    if(!workout){
      return res.status(404).json({
        success: false,
        error: 'No workout were found'
      })
    }
    
    await workout.remove()

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



