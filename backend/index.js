import express from 'express';
import cors from 'cors';
// const cors = require('cors');
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import blogRoutes from './routes/blogApi.js';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT | 4000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/', apiRoutes);
app.use('/api', blogRoutes);

// mongodb connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to MongoDB')).catch((error) => console.log('Error connecting to MongoDB : ', error));

// app listening

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});