var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'database1.cbokas4bramw.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '11111111',
    database: 'review',
    port: '3306',
    dateStrings: 'date',
});

connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        // connection.query("create database review", function(err, rows, fields) {
        //     console.log(rows);
        // });

        // connection.query("show databases", function(err, rows, fields) {
        //     console.log(rows);
        // });

        // connection.query('create table list (No INT NOT NULL PRIMARY KEY, Date date NULL, Title VARCHAR(50) NOT NULL, Writer VARCHAR(50) NULL, Genre VARCHAR(30) NULL, Summary TEXT NULL, Favorite TEXT NULL);', (error, results, fields) => {
        //     if (error) throw error;
        //     console.log('results');
        // });

        connection.query('insert into list (No, Date, Title, Writer, Genre, Summary, Favorite) values (1, \'2023-05-19\', \'제목\', \'작가\', \'장르\', \'내용1\', \'내용2\');', (error, results, fields) => {
            if (error) throw error;
            console.log(results);
        });
    }
});