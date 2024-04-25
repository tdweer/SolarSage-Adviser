const express = require('express')
const bcrypt = require('bcrypt')
const validator = require('validator')


//controllers & functions
const { signupUser, loginUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

router.get('/current-user', requireAuth ,(req, res) => {
    try{
        res.status(200).send(req.user)
    }catch(err){
        res.status(401).send(err);
    }
});


module.exports = router