const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required'],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true })

// Methods
userSchema.methods = {
    generateJwtToken: function () {
        const bodyPayload = { id: this._id, email: this.email }
        return JWT.sign(bodyPayload, process.env.SECRET_KEY, { expiresIn: 45 * 60 });
    }
}

// Mongoose middleware
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10);
    return next()
})

const User = mongoose.model("User", userSchema);
module.exports = User