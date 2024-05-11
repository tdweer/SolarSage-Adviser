const express = require('express');
const emailController = require('../controllers/SendEmail'); // Make sure the path is correct

const emailRouter = express.Router();

emailRouter.post('/sendmail', async (req, res) => {
    const { email, value, addData } = req.body;

    try {
        // Call sendmailWithPDF from the emailController
        await emailController.sendmailWithPDF(email, 'Solar Package ', `Welcome to Solar Sage Adviser\nThis is your Predicted Cost = Rs. ${value}\nThis is the Solar Package you choose:\n${addData}\nThank you for choosing us.`);
        res.status(200).send('Email Sent with PDF attachment');
    } catch (error) {
        console.error('Error sending email with PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = emailRouter;
