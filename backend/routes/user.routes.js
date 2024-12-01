const Router = require("express").Router();
const { user, register, login, changeAdmin } = require("../controller/user.controller");

Router.route("/register").post(register)
Router.route("/login").get(login)
Router.route("/changeadmin").get(changeAdmin)

module.exports = Router;
