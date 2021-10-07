const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'william',
    password:'william123',
    database:'eduwork-cruds'
})

module.exports = connection;

