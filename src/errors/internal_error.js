const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class InternalServerError extends Error {
    constructor() {
        const errorMessage = "Some thing went wrong please try again later!"
        super(errorMessage)
        this.statusCode = StatusCodesINTERNAL_SERVER_ERROR;
        this.reason = ReasonPhrases.INTERNAL_SERVER_ERROR;
        this.errorMessage = errorMessage;

    }
}