const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'eduwork-cruds-v2',
    host:'localhost',
    username: 'william',
    password: 'william123',
    dialect:'mysql'
});

module.exports = sequelize;