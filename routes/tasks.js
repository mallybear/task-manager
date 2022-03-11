const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

const { getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask } = require('../controllers/tasks') // after creating tasks controller, need to add these

router.route('/').get(getAllTasks).post(createTask) // here we combine tasks that have same path /api/v1/tasks and choose what controller to use
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask) // here we combine tasks that have same path /api/v1/tasks/:id 

module.exports = router