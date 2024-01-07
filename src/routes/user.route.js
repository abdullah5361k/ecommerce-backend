const express = require("express");
const userRoute = express.Router();
const validation = require("../middlewares/validations.middleware");
const { createUser, logIn } = require("../controllers/user.controller");
const passport = require("passport");

userRoute.post("/signup", validation, createUser)
userRoute.post("/signin", logIn)
userRoute.get("/profile", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log("Acceipt", req.user)
    res.status(200).json({ success: true })
})

module.exports = userRoute