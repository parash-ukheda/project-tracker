const express = require('express');
const { AuthRegister, AuthMe, AuthLogin } = require('../controller/auth-controller');
const { authenTication } = require('../middleware/auth.middleware');

const auth_routes = express();
auth_routes.post('/register',AuthRegister);
auth_routes.post('/login',AuthLogin);
auth_routes.get('/me',authenTication,AuthMe);
module.exports = auth_routes;