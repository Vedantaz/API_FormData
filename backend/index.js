import express from 'express';
import cors from 'cors';
// const cors = require('cors');
import dotenv from 'dotenv';
const apiRoutes = require('./routes/api')

const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());


app.use('/', apiRoutes);



app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});