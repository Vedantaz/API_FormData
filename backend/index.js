const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api')

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/', apiRoutes);



app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});