const express = require('express');
const { AuthRegister, AuthMe, AuthLogin } = require('../controller/auth-controller');
const { authenTication } = require('../middleware/auth.middleware');
const { upload } = require('../middleware/service-middleware');

const auth_routes = express();
auth_routes.post('/register',upload.single('fileUrl'),AuthRegister);
auth_routes.post('/login',AuthLogin);
auth_routes.get('/me',authenTication,AuthMe);
module.exports = auth_routes;