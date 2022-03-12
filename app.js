const express = require('express') // include express module in file
const app = express() // initialize and invoke an instance of the module
const tasks = require('./routes/tasks') // include tasks from routes 
const connectDB = require('./db/connect')
require('dotenv').config() // include .env file to pass the connection string
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public')) // apply files from public folder
app.use(express.json())
app.use('/api/v1/tasks', tasks) // looking for this path always / all our routes for the tasks
app.use(notFound) // middleware function that handles our error 404
app.use(errorHandlerMiddleware) // middleware function that handles the error passed by notFound middleware

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI) // pass connection string for db here
        app.listen(port, console.log(`Server is listening on port ${port}...`)) // only start server if DB connection is successful
    } catch (error) {
        console.log(error)
    }
}

start()

