const express = require('express');
const { authenTication } = require('../middleware/auth.middleware');
const { commentCreateFun , allCommentFun , gettingCommentByTaskIdFun , updateCommentFun , deleteCommentFun } = require('../controller/comment-controller');
const comment_routes = express.Router();

comment_routes.post('/create',authenTication,commentCreateFun);
comment_routes.get('/all',authenTication,allCommentFun);
comment_routes.get('/:id',authenTication,gettingCommentByTaskIdFun);
comment_routes.put('/update/:id',authenTication,updateCommentFun)
comment_routes.delete('/delete/:id',authenTication,deleteCommentFun)

module.exports = comment_routes