require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projects');
const clientRoutes = require('./routes/clients');
const staffRoutes = require('./routes/staff');
const salesRoutes = require('./routes/sales');
const userRoutes = require('./routes/user');
const cors = require('cors');

// MongoDB schema and model for deposits
const depositSchema = new mongoose.Schema({
  amount: Number,
  date: String,
});

const Deposit = mongoose.model('Deposit', depositSchema);

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/user', userRoutes);

// Route to get all deposits
app.get('/api/deposits', async (req, res) => {
  try {
    const deposits = await Deposit.find();
    res.json(deposits);
  } catch (error) {
    console.error('Error fetching deposits:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to create a new deposit
app.post('/api/deposits', async (req, res) => {
  try {
    const { amount, date } = req.body;
    // Create a new deposit document
    const newDeposit = new Deposit({ amount, date });
    // Save the deposit to the database
    await newDeposit.save();
    res.status(201).json(newDeposit);
  } catch (error) {
    console.error('Error creating deposit:', error);
    res.status(500).send('Internal Server Error');
  }
})

// Route to get the count of projects
app.get('/api/projects', async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching project count:', error);
    res.status(500).send('Internal Server Error');
  }
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');

    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
