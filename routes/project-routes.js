const express = require('express');
const { authenTication } = require('../middleware/auth.middleware');
const { AuthorizeRole } = require('../middleware/service-middleware');
const { projectCreateFun , getProjectFun, getAllProject, updateProject, deleteProject } = require('../controller/project-controller');
const { body } = require('express-validator');
const {path} = require('path')
const  project_routes = express.Router();

project_routes.post('/',authenTication,AuthorizeRole('Admin' || 'Superadmin'),[
    body('projectName').notEmpty().withMessage('Project name is required'),
    body('manager').notEmpty().withMessage('Manager name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('clientName').notEmpty().withMessage('ClientName is required'),
    body('plantName').notEmpty().withMessage('PlantName is required'),
    body('status').notEmpty().withMessage('Status is required'),
    body('startDate').notEmpty().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/),
    body('dueDate').notEmpty().matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  .withMessage('Duedate must be in dd/mm/yyyy format'),
  body('progress').notEmpty().withMessage('Progress count is required'),
    ],projectCreateFun);
project_routes.get('/all',authenTication,getAllProject);
project_routes.get('/:id',authenTication,getProjectFun);
project_routes.put('/:id',authenTication,updateProject);
project_routes.delete('/:id',authenTication,deleteProject)

module.exports = project_routes;