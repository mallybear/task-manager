const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({ // creates a structure for the documents in our collection
    name: {
        type: String,
        required: [true, 'Must provide task name'],
        trim: true,
        maxlength: [20, 'Task name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', taskSchema) // export our model