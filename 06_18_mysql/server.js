const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'jwbook',
    password:'1234',
    database: 'myboard',
}); // 연결 설정
conn.connect(); // MySQL 연결 완료

//require: import 같은 의미 (라이브러리 가져오기)
const express=require('express');
const app=express();

app.use(express.static('public'));  // 미들웨어 설정 static resource를 다이렉트로 찾음

app.listen(8080, function(){
    console.log("8080 server ready...");
});

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/public/index.html");
// });  // 미들웨어 설정하면 라우터가 필요 없어짐

app.get('/list', function(req,res) {
    const rows=conn.query('select * from post', function(err, rows, fields){ // err 있으면 1 없으면 rows 가져옴
        if(err) {
            console.log(err);
        } else {
            console.log(rows); // rows를 블럭 안에서만 사용하도록 해야됨
            res.send(rows);
        }
    });   

    // res.send(rows); // 이렇게 받아오면 안됨
});