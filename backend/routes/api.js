const express = require('express');
const router = express.Router();
const formConfig = require('../data/formConfig.json');

router.post('/api/validateForm', async (req, res) => {
    const formData = req.body;

    if (!formData.email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (formData.password && formData.password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    if (formData.password !== formData.confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    res.status(200).json({ message: 'Validation successful' });
});

router.post('/api/forms/submit', (req, res) => {
    const submittedData = req.body;

    console.log('Form Submitted:', submittedData);

    res.json({
        success: true,
        message: 'Form submitted successfully!',
        submittedData,
    });
});

router.post('/api/saveFormData', (req, res) => {
    const formData = req.body;

    console.log('Received form data:', formData);

    res.status(200).json({ message: 'Data received successfully', formData: formData });
});

router.get('/api/forms/config', (req, res) => {
    res.json(formConfig);
});

const VALID_EMAIL = 'abc@gmail.com';
const VALID_PASSWORD = 'Ved@123';
//login endpoint
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({success:  false, message : 'Email and password are required'});
    };

    if(email === VALID_EMAIL && password === VALID_PASSWORD){
        return res.json({
            success:true,
            message:'Login successful',
            token:'fake-jwt-token',
            user: {email}
        })
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
        });
    }

});

module.exports = router;


