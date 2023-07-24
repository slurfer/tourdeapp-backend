const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Record = sequelize.define('record', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    programmingLanguage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timeSpent: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },

})

module.exports = Record;