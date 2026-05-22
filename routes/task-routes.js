const express = require('express');
const { body } = require('express-validator');
const { authenTication } = require('../middleware/auth.middleware');
const { createTaskFun, getAllTask, taskDeleteFun, taskUpdate } = require('../controller/task-controller');

const task_routes = express.Router();
task_routes.post('/',authenTication,[
    body('phase').notEmpty().withMessage('Phase is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('assignee').notEmpty().withMessage('Please assign the task to the user.'),
    body('priority').notEmpty().withMessage('Priority is required'),
    body('startDate').notEmpty().withMessage('Start date is required'),
    body('dueDate').notEmpty().withMessage('Due date is required'),
    body('status').notEmpty().withMessage('Status is required')
],createTaskFun);
task_routes.get('/',authenTication,getAllTask);
task_routes.delete('/delete/:id', authenTication, taskDeleteFun);
task_routes.put('/update/:id', authenTication, taskUpdate)
module.exports = task_routes;