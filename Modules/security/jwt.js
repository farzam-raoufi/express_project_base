const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, TOKEN_EXPIRE } = require("../../config");
const { InternalError } = require('../Error/Error');
const { INTERNAL_ERROR } = require("../Error/StatusCode");

/**
 * Hash passwoeds for user
 * @param {string} password  - the pasword to be hash
 * @param {string} salt - user salt
 */
exports.password_encoder = (password, salt) => {

    try {
        return crypto.createHmac("sha256", salt).update(password).digest("base64");
    } catch (error) {
        throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to encoder password")
    }
}


module.exports.new_salt = (size=16) => {
    return crypto.randomBytes(size).toString('hex');
}


module.exports.password_validator = (enteredPassword, salt, user_pas) => {
    return this.password_encoder(enteredPassword, salt) === user_pas;
};

module.exports.sign_payload = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRE })
},

module.exports.validate_Authorization = (Authorization) => {
    return jwt.verify(Authorization.split(' ')[1], TOKEN_SECRET);
};
