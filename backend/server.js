require('dotenv').config()


const express = require('express')
const projectRoutes = require('./routes/projects')

//express app
const app = express()

//middleware
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// //routes
app.use('/api/projects',projectRoutes)



//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port, ', process.env.PORT);
})

