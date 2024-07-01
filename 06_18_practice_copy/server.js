var mysql = require('mysql');
var conn = mysql.createConnection({
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

// app.get('/', function (req,res){
//     res.sendFile(__dirname+'/public/index.html');
// });

app.get('/list', function(req,res){
    conn.query('SELECT *  FROM post INNER JOIN profile ON post.profile_id = profile.id;', function(err, rows, fields){
        if(err) 
            throw err;
        else{
            res.send(rows);
        }
    });
});