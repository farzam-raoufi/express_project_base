const { InternalError } = require("../../../Modules/Error/Error");
const { INTERNAL_ERROR } = require("../../../Modules/Error/StatusCode");
const { UserModel } = require("../Models");


class UserRepository {

    constructor({ email, name, family, password, salt}) {
        this.email = email
        this.name = name
        this.family = family
        this.password = password
        this.salt = salt
    }

    async save() {
        try {
            const user_model = await UserModel
            const user = await user_model.create({
                email: this.email,
                password: this.password,
                salt: this.salt,
            });
            return user;
        } catch (err) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to create a new user")
        }
    }

    static async get_user_by_email(email, filds = []) {
        try {
            let query = {
                where: { email }
            }
            filds.length ? query.attributes = filds : null;
            const user_model = await UserModel
            return await user_model.findOne(query)
        } catch (err) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to find user")
        }
    }

    static async get_user_by_id(id, filds = []) {
        try {
            let query = {
                where: { id }
            }
            filds.length ? query.attributes = filds : null;
            const user_model = await UserModel
            const user = await user_model.findOne(query);
            return user;
        } catch (err) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to find user")
        }
    }

    async edit_user_info(id) {
        try {

            const update_object = {}
            this.name !== undefined ? update_object.name = this.name : null
            this.family !== undefined ? update_object.family = this.family : null

            const user_model = await UserModel
            const result = await user_model.update(update_object, {
                where: { id }
            });
            return result
        } catch (err) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to edit user")
        }
    }

    static async check_unique_email(email) {
        try {
            const user_model = await UserModel
            const count = await user_model.count({ where: { email } });
            return count === 0

        } catch (err) {
            throw new InternalError("Internal Error", INTERNAL_ERROR, "Unable to check email")
        }
    }

}

module.exports = UserRepository;