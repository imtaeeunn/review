const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./lib/db');

// npm init
// npm install mysql --save
// npm install express@4 --save
// npm install ejs --save
// npm install body-parser --save

const app = express();

app.use(bodyParser.urlencoded({
    extended: false,
}));


app.use(express.static(`${__dirname}/public`));


app.get('/', (request, response) => {
    fs.readFile('public/list.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from list', (error, results, fields) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data: results,
            }));
        });
    });
});


app.get('/create', (request, response) => {
    fs.readFile('public/listcreate.html', 'utf-8', (error, data) => {
        if (error) throw error;
        response.send(data);
    });
});

//데이터 추가, post요청이 발생하면
app.post('/create', (request, response) => {
    console.log(request.body);
    const body = request.body;
    connection.query('INSERT INTO list (No, Date, Title, Writer, Genre, Summary, Favorite) VALUES (?, ?, ?, ?, ?, ?, ?)', [body.No, body.Date, body.Title, body.Writer, body.Genre, body.Summary, body.Favorite], (error, data) => {
        if (error) throw error;
        response.redirect('/');
    });
});

// 데이터 수정
app.get('/modify/:id', (request, response) => {
    // 파일을 읽어옵니다.
    fs.readFile('public/listupdate.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from list WHERE No = ?', [request.params.id], (error, results) => {
            if (error) throw error;
            console.log(request.params.id);
            response.send(ejs.render(data, {
                data: results[0],
            }));
        });
    });
});


app.post('/modify/:id', (request, response) => {
    const body = request.body;
    connection.query('UPDATE list SET No = ?, Date = ?, Title = ?, Writer = ?, Genre = ?, Summary = ?, Favorite = ? WHERE No = ?', [body.No, body.Date, body.Title, body.Writer, body.Genre, body.Summary, body.Favorite, request.params.id], (error, results) => {
        if (error) throw error;
        response.redirect('/');
    });
});


//데이터 삭제
app.get('/delete/:id', (request, response) => {
    connection.query('DELETE from list WHERE No = ?', [request.params.id], () => {
        //조회 페이지로 이동
        response.redirect('/');
    });
});


app.listen(3000, () => {
    console.log('Server is running port 3000!');
});



// 데이터베이스 연결
// connection 변수는 연결할 때 사용 되는 정보를 담고 있습니다.
//connect(); 메소드가 mysql에 연결을 합니다.

// connection.connect();

// // // create 쿼리문 사용
// // //query('mysql_query', callback); 에서 실제 데이터 베이스의 값을 다룹니다.
// connection.query('create table list (No INT NOT NULL PRIMARY KEY, Date date NULL, Title VARCHAR(50) NOT NULL, Writer VARCHAR(50) NULL, Genre VARCHAR(30) NULL, Summary TEXT NULL, Favorite TEXT NULL);', (error, results, fields) => {
//     if (error) throw error;
//     console.log('table생성 완료!');
// });

// // // // Insert 쿼리문 사용
// connection.query('insert into list (No, Date, Title, Writer, Genre, Summary, Favorite) values (1, \'2023-05-19\', \'제목\', \'작가\', \'장르\', \'내용1\', \'내용2\');', (error, results, fields) => {
//     if (error) throw error;
//     console.log('데이터 입력 성공!');
// });

// // 연결 종료
// connection.end();