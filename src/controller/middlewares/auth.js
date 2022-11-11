const { validate_Authorization } = require('../../../Modules/security/jwt');

module.exports = async (req,res,next) => {
    try {
        const Authorization = req.get('Authorization');
        req.user = validate_Authorization(Authorization);
        next();
        return
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // throw CustomError
            // 401
            res.status(401).send("token expired")
        }
        // throw CustomError
        // 403
        res.status(403).send("Not Authorized")
    }
}