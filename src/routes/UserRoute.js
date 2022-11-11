const rateLimit = require('express-rate-limit')
const { Router } = require("express");
const auth = require("../controller/middlewares/auth");
const { user_info, sing_in, sing_up, edit_user, confirm_email, send_verify_email } = require("../controller/UserController");

const router = Router()

const rateLimit_conf = {
    max: 5, // limit each IP to 5 requests per 60 seconds
    delayMs: 0, // disable delaying - full speed until the max limit is reached
}


router.post("/singin", rateLimit(rateLimit_conf), sing_in);
router.post("/singup", rateLimit(rateLimit_conf), sing_up);
router.post("/send_verify_email", rateLimit(rateLimit_conf), send_verify_email);
router.get("/", auth, user_info);
router.patch("/edit", auth, edit_user);

module.exports = router