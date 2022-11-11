const Redis = require('ioredis');
const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = require('../../config');

module.exports = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
});
