require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const projectRoutes = require('./routes/projects')

//express app
const app = express()



//middleware
app.use(express.json())


app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
         console.log('Connected to the db & listening on port, ', process.env.PORT);
})

    })
    .catch((err) => {
        console.log(err)
    })


// //routes
app.use('/api/projects',projectRoutes)





