const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB:', err));

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 11000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
