const routes = require("express").Router();
const authController = require("../controllers/auth.controller");

routes.post("/",authController.login);

routes.get("/",authMiddleware,authController.valid);

module.exports = routes;