require("dotenv").config()
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db.config")
const userRoute = require("./src/routes/user.route")
const errorMiddleware = require("./src/middlewares/error.middleware")
console.log(process.env.PORT);

app.use(express.json())

app.use("/api/v1/user", userRoute);


// ERror middleware
app.use(errorMiddleware)

app.listen(PORT, async () => {
    await db()
    console.log(`App is running on ${PORT}`)
})