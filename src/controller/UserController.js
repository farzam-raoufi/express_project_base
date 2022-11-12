const user_services = require("../services/UserServices")
const UseValidator = require('../../Modules/security/validator/UseValidator');

exports.send_verify_email = (req, res, next) => {
    const { email } = req.body

    validator = UseValidator.send_verify_email({ email })
    if (validator === true) {
        user_services.send_verify_email(email).then(() => {
            res.status(204).end()
        }).catch((error) => {
            next(error)
        })
    } else {
        res.status(400)
        let items = []
        for (const index of validator) {
            items.push({ field: index.field, message: index.message })
        }
        res.send({
            message: "invalid request payload",
            items
        })
    }
}

exports.sing_up = (req, res, next) => {
    const { email, password, code } = req.body

    validator = UseValidator.sing_in({ email, password, code })
    if (validator === true) {
        user_services.verify_email(email, code).then((result) => {
            if (result) {
                user_services.sign_up(email, password).then((token) => {
                    res.status(201)
                    res.send({
                        token
                    })
                }).catch((error) => {
                    next(error)
                })
            } else {
                res.status(401)
                res.send("verification code is not valid")
            }
        }).catch((error) => {
            next(error)
        })
    } else {
        res.status(400)
        let items = []
        for (const index of validator) {
            items.push({ field: index.field, message: index.message })
        }
        res.send({
            message: "invalid request payload",
            items
        })
    }
}

exports.sing_in = (req, res, next) => {
    const { email, password } = req.body
    validator = UseValidator.sing_in({ email, password })
    if (validator === true) {
        user_services.sign_in(email, password).then((token) => {
            res.status(201)
            res.send({
                token
            })
        }).catch((error) => {
            next(error)
        })
    } else {
        res.status(400)
        let items = []
        for (const index of validator) {
            items.push({ field: index.field, message: index.message })
        }
        res.send({
            message: "invalid request payload",
            items
        })
    }

}

exports.user_info = (req, res, next) => {
    user_services.get_user_data(req.user.id).then((user_data) => {
        res.send(user_data)
    }).catch((error) => {
        next(error)
    })
}

exports.edit_user = (req, res, next) => {
    const { name, family } = req.body

    validator = UseValidator.edit_user({ name, family })
    if (validator === true) {
        user_services.edit_user_data(req.user.id, { name, family }).then((user_data) => {
            res.status(204).end()
        }).catch((error) => {
            next(error)
        })
    } else {
        res.status(400)
        let items = []
        for (const index of validator) {
            items.push({ field: index.field, message: index.message })
        }
        res.send({
            message: "invalid request payload",
            items
        })
    }

}