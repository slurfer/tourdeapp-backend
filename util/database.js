const Sequelize = require('sequelize');

const sequelize = new Sequelize("tourdeapp-remake", 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false
})

module.exports = sequelize;

