const express = require('express');
const emailController = require('../controllers/SendEmail');


const emailRouter = express.Router();

emailRouter.post('/sendmail', (req, res) => {

    const {email , value} = req.body;
    try{
        emailController.sendmail(email , 'Predeted Value' , value);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
});

module.exports = emailRouter;