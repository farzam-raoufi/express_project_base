const Validator = require("fastest-validator");

const validator = new Validator();

exports.send_verify_email = validator.compile({
    email: { type: "email" },
})


exports.sing_up = validator.compile({
    email: { type: "email" },
    password :{ type: "string", min: 4, max: 255 },
    code: { type: "string", length:4 },
})

exports.sing_in = validator.compile({
    email: { type: "email" },
    password :{ type: "string" },
})

exports.edit_user = validator.compile({
    name: { type: "string", max: 255,optional: true},
    family: { type: "string", max: 255,optional: true},
})