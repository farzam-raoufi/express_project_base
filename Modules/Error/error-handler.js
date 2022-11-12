const { CustomError } = require("./Error");

const ErrorHandler = async (err, req, res, next) => {

    if (err) {
        if (err instanceof CustomError) {
            if (err.errorStack) {
                const errorDescription = err.errorStack;
                return res.status(err.statusCode).json({ 'message': errorDescription })
            }
            return res.status(err.statusCode).json({ 'message': err.message })
        } else {
            //process exit // terriablly wrong with flow need restart
            console.log(err);
            process.exit(1)
        }
    }
    next();
}

module.exports = ErrorHandler;