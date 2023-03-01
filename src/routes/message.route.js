const route = require("express").Router();
const messageController = require('../controllers/message.controller');

route.post("/",messageController.create);

module.exports = route;