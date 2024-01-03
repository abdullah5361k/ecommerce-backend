const { validationResult } = require("express-validator")
const User = require("../models/user.model");
const CustomErrors = require("../utils/errors");

exports.createUser = async (req, res, next) => {
    // Validaions
    if (reqValidation(req, next)) {
        return;
    }

    const { name, email, password } = req.body;
    const isEmailExist = await User.findOne({ email }).select("email");
    console.log("ISemail ", isEmailExist)
    if (isEmailExist) {
        return next(new CustomErrors(409, `User with this email: ${isEmailExist.email} already register please use another email`))
    }

    const user = new User({ name, email, password });
    try {
        await user.save()
    } catch (err) {
        return next(new CustomErrors(500, "An error occurred while storing user data"))
    }

    const jwtToken = user.generateJwtToken();
    console.log("sigUp Token ", jwtToken);
    user.password = undefined;
    res.setHeader('Authorization', `Bearer ${jwtToken}`);
    return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user
    })

}

// Req validations
function reqValidation(req, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(new CustonError(400, errors.array()))
        return true;
    }
    return false;
}