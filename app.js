const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const studentRoutes = require('./routes/student');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/student', studentRoutes);

mongoose.connect(
  'mongodb://localhost:27017/studentsDB',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);
app.listen(port, () => {
  console.log(`localhost running on port ${port}`);
});
