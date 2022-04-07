import { Router } from 'express';
 
//Express route
const router = Router();

const workout = require('../controllers/workout.controller');

router.get('/', (req, res ) => res.send('hello from workout route'))

//get all users
router.get('/workouts', workout.findAll);
 
//get a single user
//add a new user
router.post('/workouts', workout.create);

//update a single user
//remove a single user
router.delete('/workouts/:id', workout.delete);


module.exports = router;