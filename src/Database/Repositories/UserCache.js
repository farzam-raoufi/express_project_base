const redis = require('./../../../Modules/Databases_Config/redis');
const { EMAIL_VERIFY_EXPIRE } = require('../../../config');

// set email verify token
exports.set_email_verify = async (email, random_token) => {
    return await redis.set(`em-${email}`, random_token, "ex", EMAIL_VERIFY_EXPIRE);
}

// get email verify token
exports.get_email_verify = async (email) => {
    return await redis.get(`em-${email}`)
}

// delete email verify token
exports.del_email_verify = async (email) => {
    return await redis.del(`em-${email}`)
}