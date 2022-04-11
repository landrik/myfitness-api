import { Router } from 'express';
 
//Express route
const router = Router();

router.get('/', (req, res ) => res.send('hello and welcome to myfitness api'))

module.exports = router;