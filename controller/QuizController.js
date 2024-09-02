const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Quizs = require("../models/quiz");
const QuizItems = require("../models/QuizItems");
const AppError = require("../utils/appError");
const { Json } = require("sequelize/lib/utils");
const CreateQuiz = asyncErrorHandler(async (req, res, next) => {
  const body = req.body;

  if (req.file) {
    body.QuizImage = req.file.filename;
  }

  const createquize = await Quizs.create({
    CategoryId: body.CategoryId,
    QuizName: body.QuizName,
    QuizImage: body.QuizImage,
  });

  res.json({
    status: true,
    message: "Quiz Created Successfully",
    data: createquize,
  });
});

const getQuizData = asyncErrorHandler(async (req, res, next) => {
  const CategoryId = req.params.CategoryId;

  const result = await Quizs.findAll({
    where: CategoryId, attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'CategoryId']
    }
  });


  const resultData = await Promise.all(result.map(async (quiz) => {
    const quizData = quiz.toJSON();


    const questionCount = await QuizItems.count({
      where: { QuizId: quizData.QuizId }
    });

    quizData.totalQuestion = questionCount;

    return quizData;
  }));

  res.json({
    status: true,
    message: `${result.length == 0 ? "Data not Found" : "Data fetched Successfully"}`,
    QuizData: resultData
  })
})

const CreateQuizQuestions = asyncErrorHandler(async (req, res, next) => {
  const body = req.body;
  const QuizId = body.QuizId;

  const QuizData = await QuizItems.findAll({
    where: { QuizId }, attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'CategoryId']
    }
  });
  if (QuizData.length >= 10) {
    return next(new AppError("You have reached the limit for adding questions. Please upgrade your plan or try again later.", 429))
  }
  await QuizItems.create({
    QuizId: body.QuizId,
    question: body.question,
    option1: body.option1,
    option2: body.option2,
    option3: body.option3,
    option4: body.option4,
    answer: body.answer,
  });

  res.json({
    status: true,
    message: "Quiz Question Created Successfully",
  });
});


const getQuiz_Question = asyncErrorHandler(async (req, res, next) => {
  const QuizId = req.query.QuizId;

  if (!QuizId) {
    return next(new AppError("QuizId is required", 400)); // Handle missing QuizId
  }
  const QuizData = await QuizItems.findAll({
    where: { QuizId }, attributes: {
      exclude: ['createdAt', 'updatedAt', 'deletedAt', 'CategoryId']
    }
  });

  res.json({
    status: true,
    message: `${QuizData.length == 0 ? "Data not Found" : "Data fetched Successfully"}`,
    Questions: QuizData
  })
})

module.exports = { CreateQuiz, CreateQuizQuestions, getQuizData, getQuiz_Question };
