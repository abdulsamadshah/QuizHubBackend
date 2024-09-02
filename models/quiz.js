const { Sequelize } = require("sequelize")
const sequelize = require("../config/database")

const Quizs = sequelize.define("Quizs",

  {
    QuizId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    CategoryId: {
    
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "CategoryId cannot be null",
        },
        notEmpty: {
          msg: "CategoryId cannot be empty"
        },
      }
    },
    QuizName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "QuizName cannot be null",
        },
        notEmpty: {
          msg: "QuizName cannot be empty"
        },
      }

    },
    QuizImage: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "QuizImage cannot be null",
        },
        notEmpty: {
          msg: "QuizImage cannot be empty"
        },
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }, {
  paranoid: true,
  tableName: "Quizs",
  freezeTableName: true,
})

Quizs.associate = (models) => {
  Quizs.hasMany(models.QuizItems, { foreignKey: "QuizId", sourceKey: "QuizId" })
}

module.exports = Quizs;