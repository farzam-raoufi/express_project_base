const { Router } = require("express");
const { index } = require("../controller/IndexController");

const router = Router()


router.get("/" ,index);

module.exports  = router