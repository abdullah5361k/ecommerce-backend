class CustomErrors extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode,
            this.message = message
        Error.captureStackTrace(this, this.captureStackTrace)
    }
}

module.exports = CustomErrors