const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const TagItem = sequelize.define('tagItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
})

module.exports = TagItem;