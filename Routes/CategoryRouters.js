const { AddQuizCategory, getQuizCategory } = require("../controller/CategoryController");

const router = require("express").Router();

const upload = require("../utils/uploadMiddleware");
router.route("/Admin/AddQuizCategory").post(upload("category").single('CategoryImage'),AddQuizCategory);
router.route("/getQuizCategory").get(getQuizCategory);


module.exports=router;