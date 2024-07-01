const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'jwbook',
    password: '1234',
    database: 'myboard',
});

conn.connect();

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(8080, function(){
    console.log('server ready...');
});

// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// });

app.get('/list', function(req, res){
    conn.query('select * from post', function(err, rows, fields){
        if(err)
            throw err;
        console.log(rows);
        res.send(rows);
    });
});