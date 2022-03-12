const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error') // have to put in curly braces

// -- Example of a controller function before applying the asyncWrapper function 
// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({})
//         res.status(200).json({ tasks })
//         // res.status(200).json({ status: "success", data: { tasks, nbHits: tasks.length } }) // other option for response
//     } catch (error) {
//         res.status(500).json({ msg: error })
//     }
// }

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)  // name_of_model.create
    res.status(201).json({ task })            // status 201 = successfuly post request
})

// -- Example of controller function before implementing the error-handler middleware
// const getTask = asyncWrapper(async (req, res) => {
//     const { id: taskID } = req.params  // from the request parameters, we are looking for the identifier called "id" and assigning its calue to "taskID"
//     const task = await Task.findOne({ _id: taskID }) // _id is the feature name in the database, and we are looking for where it equals "taskID" and assigning it to task   
//     if (!task) {  // if task does not exist
//         return res.status(404).json({ msg: `No task with id ${taskID} found` })
//     }
//     res.status(200).json({ task }) // returning task being asked for
// })

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params  // from the request parameters, we are looking for the identifier called "id" and assigning its calue to "taskID"
    const task = await Task.findOne({ _id: taskID }) // _id is the feature name in the database, and we are looking for where it equals "taskID" and assigning it to task   
    if (!task) {  // if task does not exist
        return next(createCustomError(`No task with id ${taskID} found`, 404))
    }
    res.status(200).json({ task }) // returning task being asked for
})


const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })  // mongoose function findOneAndDelete
    if (!taskID) {
        return res.status(404).json({ msg: `No task with id ${taskID} found` })
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true, // will return the new/changed object
        runValidators: true   // will run the model validators
    })
    if (!taskID) {
        return res.status(404).json({ msg: `No task with id ${taskID} found` })
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}