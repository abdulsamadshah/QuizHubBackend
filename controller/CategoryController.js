const quizcategory = require("../models/quizcategory");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const AddQuizCategory = asyncErrorHandler(async (req, res, next) => {

    const body = req.body;
    if (req.file) {
        body.CategoryImage = req.file.filename;
    }
    await quizcategory.create({
        CategoryName: body.CategoryName,
        CategoryImage: body.CategoryImage,
    });
    res.json({
        status: true,
        message: "Category Added Successfully"
    })

});

const getQuizCategory = asyncErrorHandler(async (req, res, next) => {

    const result = await quizcategory.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt']
        }
    });

    const quizCategoriesWithImageUrls = result.map(category => {
        if (category.CategoryImage) {
            category.CategoryImage = `${req.protocol}://${req.get('host')}/uploads/categories/${category.CategoryImage}`;
        }
        return category;
    });
    return res.json({
        status: true,
        message: `${result.length == 0 ? "Data not Found" : "Data fetched Successfully"}`,
        QuizCategory: quizCategoriesWithImageUrls
    });
});


module.exports = { AddQuizCategory, getQuizCategory }