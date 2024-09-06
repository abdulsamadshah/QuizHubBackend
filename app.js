const express = require("express");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const path = require('path'); // Import the path module
const CategoryRoutes = require("./Routes/CategoryRouters");
const QuizRouters = require("./Routes/QuizRouters");

const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads/categories' directory
app.use("/uploads/categories", express.static(path.join(__dirname, 'uploads', 'categories')));
app.use("/uploads/products", express.static(path.join(__dirname, 'uploads', 'products')));


// Routes
app.use("/api/v1/", CategoryRoutes, QuizRouters);

// Handle undefined routes
app.all('*', (req, res, next) => {
    const err = new AppError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
});

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
    console.log("Server is Running................" + PORT);
});
