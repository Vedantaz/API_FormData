const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formConfig = require('./data/formConfig.json');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/forms/config', (req, res) => {
  res.json(formConfig);
});

app.post('/api/forms/submit', (req, res) => {
  const submittedData = req.body;

  console.log('Form Submitted:', submittedData);

  res.json({
    success: true,
    message: 'Form submitted successfully!',
    submittedData,
  });
});

app.post('/api/saveFormData', (req, res) => {
    const formData = req.body;
  
    console.log('Received form data:', formData);
  
    res.status(200).json({ message: 'Data received successfully', formData:formData });
  });


app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});