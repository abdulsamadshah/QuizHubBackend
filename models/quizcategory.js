const { Sequelize } = require("sequelize")
const sequelize = require("../config/database")

module.exports = sequelize.define("QuizCategories",
  
  {
  CategoryId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  CategoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CategoryName cannot be null",
      },
      notEmpty: {
        msg: "CategoryName cannot be empty"
      },
    }
  },
  CategoryImage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "CategoryImage cannot be null",
      },
      notEmpty: {
        msg: "CategoryImage cannot be empty"
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
    allowNull: true,
    type: Sequelize.DATE
  }
}, {
  paranoid: true,
  tableName: "QuizCategories",
  freezeTableName: true,
})