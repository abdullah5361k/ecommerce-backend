const express = require("express");
const userRoute = express.Router();
const validation = require("../middlewares/validations.middleware");
const { createUser } = require("../controllers/user.controller");

userRoute.post("/signup", validation, createUser)

module.exports = userRoute