const { MAIL_PASSWOR } = require("../../config")
const { InternalError, CustomError } = require("../../Modules/Error/Error")
const { INTERNAL_ERROR } = require("../../Modules/Error/StatusCode")
const { new_salt, password_encoder, sign_payload, password_validator } = require("../../Modules/security/jwt")
const { send_email } = require("../../Modules/utils/mailer")
const UserCache = require("../Database/Repositories/UserCache")
const UserRepository = require("../Database/Repositories/UserRepository")

class user_services {

    static async sign_up(email, password) {

        try {
            const is_email_unique = await UserRepository.check_unique_email(email)
            if (is_email_unique) {

                let salt = new_salt()
                let incoded_password = password_encoder(password, salt)
                const new_Use = new UserRepository({ email, password: incoded_password, salt })
                const user = await new_Use.save()
                return sign_payload({ email: user.email, id: user.id })
            }
            // 409 user exist, code:409, description:"user exsist"
            // throw CustomError
            throw new Error("user exist")

        } catch (err) {
            // console.log(err);
            if (err instanceof CustomError) {
                throw err
            }
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to sign up user")
        }

    }
    static async sign_in(email, password) {
        try {
            const this_user = await UserRepository.get_user_by_email(email, ["password", "salt", "id"])
            if (this_user) {

                const is_Password_valid = password_validator(password, this_user.salt, this_user.password)

                if (is_Password_valid) {
                    return sign_payload({ email: email, id: this_user.id })
                }
                // code:401,description:"incorrect password"
                // throw CustomError
                throw new Error("incorrect password")
            }
            // code:401,description:"user not exsist"
            // throw CustomError
            throw new Error("user not exist")
        } catch (err) {
            // console.log(err);
            if (err instanceof CustomError) {
                throw err
            }
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to sign up user")
        }
    }


    static async get_user_data(user_id) {
        try {
            return await UserRepository.get_user_by_id(user_id, ["email", "name", "family"])
        } catch (err) {
            if (err instanceof CustomError) {
                throw err
            }
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to get user data")
        }
    }

    static async edit_user_data(user_id, { name, family }) {
        try {
            const user = new UserRepository({ name, family })
            let result = await user.edit_user_info(user_id)
            if (result == 1) {
                return
            } else {
                throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to edit user data")
            }
        } catch (err) {
            if (err instanceof CustomError) {
                throw err
            }
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to edit user data")
        }
    }

    static async send_verify_email(email) {
        try {
            const random_token = new_salt(2)
            await UserCache.set_email_verify(email, random_token)
            await send_email(MAIL_PASSWOR, email, "verify your email", `<h5>code:${random_token}</h5>`)
        } catch (error) {
            try {
                await UserCache.del_email_verify(email)
            } catch (error) {
                throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to send verify email")
            }
            if (err instanceof CustomError) {
                throw err
            }
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to send verify email")
        }
    }
    static async verify_email(email , code) {
        try {
            const user_token = await UserCache.get_email_verify(email)
            if (user_token === code) {
                return true
            }
            return false
        } catch (error) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to verify email")
        }
    }
}
module.exports = user_services