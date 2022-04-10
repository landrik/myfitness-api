import { Router } from 'express';
 
//Express route
const router = Router();

const exercise = require('../controllers/exercise.controller');

//router.get('/', (req, res ) => res.send('hello from exercise route'))

//get all users
router.get('/', exercise.findAll);
 
//get a single user
//add a new user
router.post('/', exercise.create);

//update a single user
//remove a single user
router.delete('/:id', exercise.delete);


module.exports = router;