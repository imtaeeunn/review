var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'database1.cbokas4bramw.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '11111111',
    database: 'review',
    port: '3306',
    dateStrings: 'date',
});

connection.connect();
module.exports = connection;