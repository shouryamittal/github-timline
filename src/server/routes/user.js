import express from 'express';
import User from '../models/user';
const router = express.Router();

router.post('/create', (req, res) => {
   User.create({
       email: req.body.email,
       password: req.body.password
   })
   .then((response) => {
        if(!response) {
            res.status(400).send('User Cannot be created');
        }
        res.status(201).send('User created');
   })
   .catch((error) => {
       res.status(500).send(error);
   })
})


export default router;