require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projects')
const clientRoutes = require('./routes/clients')
const staffRoutes = require('./routes/staff')
const salesRoutes = require('./routes/sales')
const userRoutes = require('./routes/user')


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// MongoDB schema and model for deposits
const depositSchema = new mongoose.Schema({
  amount: Number,
  date: String,
})
const Deposit = mongoose.model('Deposit', depositSchema)

// routes
app.use('/api/projects', projectRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/user', userRoutes)






// New endpoint for fetching deposits
app.get('/api/deposits', async (req, res) => {
  try {
    // Fetch deposit data from MongoDB
    const deposits = await Deposit.find();
    res.json(deposits);
  } catch (error) {
    console.error('Error fetching deposits:', error);
    res.status(500).send('Internal Server Error');
  }
})


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 