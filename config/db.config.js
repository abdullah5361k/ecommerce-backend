const mongoose = require("mongoose");

async function dbConnection() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connect to mongodb")
    } catch (err) {
        console.log("DB error ", err)
        process.exit(1)
    }
}

module.exports = dbConnection