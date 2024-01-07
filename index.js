require("dotenv").config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db.config")
const userRoute = require("./src/routes/user.route")
const errorMiddleware = require("./src/middlewares/error.middleware");
const passport = require("passport");
const strategy = require("./src/middlewares/passportJwt.middleware");
console.log(process.env.PORT);

app.use(express.json())
// Set up middleware
app.use(passport.initialize());
passport.use(strategy)

app.use("/api/v1/user", userRoute);


// ERror middleware
app.use(errorMiddleware)

app.listen(PORT, async () => {
    await db()
    console.log(`App is running on ${PORT}`)
})