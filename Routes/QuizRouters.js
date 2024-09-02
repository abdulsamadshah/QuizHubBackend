const router = require("express").Router();

const { CreateQuiz, getQuizData, CreateQuizQuestions, getQuiz_Question } = require("../controller/QuizController");
const upload = require('../utils/uploadMiddleware');
router.route("/Admin/AddQuiz").post(upload("product").single("QuizImage"),CreateQuiz);
router.route("/getQuizData").get(getQuizData);
router.route("/Admin/AddQuizQuestion").post(CreateQuizQuestions);
router.route("/getQuestions").get(getQuiz_Question);



module.exports =router;










