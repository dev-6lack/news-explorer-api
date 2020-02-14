const routerUsers = require('express').Router();
const { findUser } = require('../controllers/users');

routerUsers.get('/users/me', findUser);

module.exports = routerUsers;
