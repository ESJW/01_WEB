const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log('server ready...');
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/inputUser', function(req,res){
    res.sendFile(__dirname + '/inputUser.html');
});

app.get('/userInfo', function(req,res){
    res.sendFile(__dirname + '/userInfo.html');
});

// const http = require('http');   // 코어에 있는 http 모듈 가져옴

// const server = http.createServer((req, res)=>{
//     res.statusCode = 200;   // 정상
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<h1>Hello World<h1>');
// });

// server.listen(3000, "127.0.0.1", () => {
//     console.log("server ready...");
// });