const express = require('express') // include express module in file
const app = express() // initialize and invoke an instance of the module
const tasks = require('./routes/tasks') // include tasks from routes 
const connectDB = require('./db/connect')
require('dotenv').config() // include .env file to pass the connection string

// middleware
app.use(express.json())


//routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks) // looking for this path always

const port = 3000

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI) // pass connection string for db here
        app.listen(port, console.log(`Server is listening on port ${port}...`)) // only start server if DB connection is successful
    } catch(error){
        console.log(error)
    }
}

start()

