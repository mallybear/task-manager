const mongoose = require('mongoose')

const connectDB = (url)=>{
    return mongoose.connect(url, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false, 
        useUnifiedTopology: true }) //only need to do for deprecation warnings (not necessary for Mongoose V6)
}

module.exports = connectDB

