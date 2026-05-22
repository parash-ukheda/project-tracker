const express = require('express');
const { authenTication } = require('../middleware/auth.middleware');
const { AuthorizeRole, upload } = require('../middleware/service-middleware');
const { createDocument, getAllDocument , updateDocument, singleDocuemt, deleteDocument } = require('../controller/document-controller');

const document_routes = express.Router()

document_routes.post('/', authenTication,AuthorizeRole('Admin'),upload.single('fileUrl'), createDocument)
document_routes.put('/:id', authenTication,AuthorizeRole('Admin'),upload.single('fileUrl'), updateDocument)
document_routes.get('/', authenTication,getAllDocument);
document_routes.get('/:id', authenTication, singleDocuemt);
document_routes.delete('/:id', authenTication,AuthorizeRole('Admin'), deleteDocument);
module.exports = document_routes;