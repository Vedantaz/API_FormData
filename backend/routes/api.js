// import express, { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';
const router = express.Router();
const formConfig = require('../data/formConfig.json');

const API_KEY = process.env.API_KEY;

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

// router.get('/get-nutrition', (req, res)=>{
//     const {query} = req.query;     // use query for the get request
 
//     if(!query){
//         return res.status(400).json({error: 'Food query is required.'});
//     }

//     request.get({
//         // url: `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
//         url : `https://api.api-ninjas.com/v1/nutrition?query=1lb brisket and fries`,
//         headers:{
//             'X-Api-key': API_KEY,
//         }
//     }, (error, response, body) => {
//         if(error){
//             console.error("Request failed.", error);
//             return res.status(500).json({ error: 'Failed to fetch nutrients' });
//         }

//         if(response.statusCode >= 400){
//             console.error('Error:', response.statusCode, body);
//             return res.status(response.statusCode).json({error: 'Error from API', details:body});
//         }
//         const nutritionData = JSON.parse(body);

//         if(!nutritionData || !nutritionData.items || nutritionData.items.length === 0){
//             return res.status(404).json({error:'No nutrition data found for the given query'});
//         }

//         const {protein_g, calories, fat_g, carbohydrates_total_g} = nutritionData.items[0];

//         const result = {
//             protein: protein_g || 0,
//             calories : calories || 0,
//             fat : fat_g || 0,
//             carbohydrates : carbohydrates_total_g || 0,
//         };
//         return res.json(result);
//     });
// });

import axios from 'axios';


router.get('/nutrition', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Food query is required.' });
  }

  try {
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Api-Key': API_KEY,
      },
    });

    const nutritionData = response.data;

    if (!nutritionData || !nutritionData.items || nutritionData.items.length === 0) {
      return res.status(404).json({ error: 'No nutrition data found for the given query.' });
    }

    const { protein_g, calories, fat_g, carbohydrates_total_g } = nutritionData.items[0];

    const result = {
      protein: protein_g || 0,
      calories: calories || 0,
      fat: fat_g || 0,
      carbohydrates: carbohydrates_total_g || 0,
    };

    return res.json(result);
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.status, error.response.data);
      return res.status(error.response.status).json({ error: 'Error from API', details: error.response.data });
    }

    console.error('Request failed:', error.message);
    return res.status(500).json({ error: 'Failed to fetch nutrients.' });
  }
});

export default router;


module.exports = router;


