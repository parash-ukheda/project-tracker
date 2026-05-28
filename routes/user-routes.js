const express = require('express');
const { createUser, getAllUser, updateUser, deleteUser, getSingleUser ,  } = require('../controller/user-controller');
const { body } = require('express-validator');
const { authenTication } = require('../middleware/auth.middleware');
const { AuthorizeRole, upload } = require('../middleware/service-middleware');

const user_routes = express.Router();
user_routes.post('/create',authenTication,AuthorizeRole('Admin' || 'Superadmin'),[
    body('fullName').notEmpty().withMessage('Full Name is required'),
    body('email').isEmail().notEmpty().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').notEmpty().withMessage('Role is required'),
    body('status').notEmpty().withMessage('Status is required')
],upload.single('fileUrl'),createUser);

user_routes.get('/all',authenTication,getAllUser);
user_routes.put('/update/:id',authenTication,AuthorizeRole('Admin' || 'Superadmin'),updateUser);
user_routes.delete('/delete/:id',authenTication,AuthorizeRole('Admin'),deleteUser);
user_routes.get('/:id',authenTication,getSingleUser)


module.exports = user_routes;