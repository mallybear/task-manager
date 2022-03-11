const Task = require('../models/tasks')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)  // name_of_model.create
        res.status(201).json({ task })            // status 201 = successfuly post request
    } catch (error) {
        res.status(500).json({ msg: error })      // status 500 = general server error

    }
}

const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params  // from the request parameters, we are looking for the identifier called "id" and assigning its calue to "taskID"
        const task = await Task.findOne({ _id: taskID }) // _id is the feature name in the database, and we are looking for where it equals "taskID" and assigning it to task   
        if (!task) {  // if task does not exist
            return res.status(404).json({ msg: `No task with id ${taskID} found` })
        }
        res.status(200).json({ task }) // returning task being asked for
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID })  // mongoose function findOneAndDelete
        if (!taskID) {
            return res.status(404).json({ msg: `No task with id ${taskID} found` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new:true, // will return the new/changed object
            runValidators:true   // will run the model validators
        })
        if (!taskID) {
            return res.status(404).json({ msg: `No task with id ${taskID} found` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}