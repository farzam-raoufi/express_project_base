const { INTERNAL_ERROR, BAD_REQUEST } = require("./StatusCode");

class CustomError extends Error {
    constructor(name,statusCode,description, isOperational, errorStack, logingErrorResponse){
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }
}


class InternalError extends CustomError {
    constructor(name, statusCode = INTERNAL_ERROR, description ='Internal Server Error',isOperational = true,){
        super(name,statusCode,description,isOperational);
    }
}

module.exports = {
    CustomError,
    InternalError,
}
