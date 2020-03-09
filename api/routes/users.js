const express = require('express');
const router = express.Router();

// const bcrypt = require('bcrypt-nodejs');
// const jwt = require('jsonwebtoken');

//const https = require('https');

const checkAuth = require('../../AuthMiddleWare/check-auth');

// const sql = require("mssql/msnodesqlv8");
// const connPool = require('../../connection');


const UsersController = require('../../controllers/users');

router.get('/GetAll', checkAuth, UsersController.GetAll);
router.post('/UserLogin', UsersController.UserLogin);
router.post('/UserSave', checkAuth, UsersController.UserSave);

// console.log('checkAuth');
// console.log(checkAuth);

router.delete('/:UserID', checkAuth, UsersController.UserDeleteById);

//router.get('/UserLogout', checkAuth, UsersController.UserLogout);

module.exports = router;

