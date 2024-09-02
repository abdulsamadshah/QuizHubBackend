const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Ensure this path is correct and points to your Sequelize instance

class QuizItems extends Model {}

QuizItems.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    QuizId: {
      allowNull: false,
      references: {
        model: 'Quizs', // This should match your Quiz model's table name
        key: 'QuizId',
      },
      type: DataTypes.INTEGER,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "question cannot be null",
        },
        notEmpty: {
          msg: "question cannot be empty",
        },
      },
    },
    option1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "option1 cannot be null",
        },
        notEmpty: {
          msg: "option1 cannot be empty",
        },
      },
    },
    option2: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "option2 cannot be null",
        },
        notEmpty: {
          msg: "option2 cannot be empty",
        },
      },
    },
    option3: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "option3 cannot be null",
        },
        notEmpty: {
          msg: "option3 cannot be empty",
        },
      },
    },
    option4: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "option4 cannot be null",
        },
        notEmpty: {
          msg: "option4 cannot be empty",
        },
      },
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "answer cannot be null",
        },
        notEmpty: {
          msg: "answer cannot be empty",
        },
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize, // Pass the Sequelize instance here
    modelName: 'QuizItems',
    tableName: 'QuizItems',
    paranoid: true,
    freezeTableName: true,
  }
);

// Define associations (if necessary)
QuizItems.associate = (models) => {
  QuizItems.belongsTo(models.Quizs, { foreignKey: 'QuizId', targetKey: 'QuizId' });
};

module.exports = QuizItems;
