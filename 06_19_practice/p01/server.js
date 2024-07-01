const express = require('express');
const app = express();

const mongoclient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

let mydb;

mongoclient.connect(url)
    .then(client=>{
        console.log('몽고DB 접속 성공');
        mydb = client.db('myboard');
        mydb.collection('post')
            .find()
            .toArray()
            .then(result=>{
                console.log(result);
            });
        app.listen(8080, function(){
            console.log('8080 server ready...');
        });
    });


app.get('/list', function(req, res){
    mydb.collection('post')
        .find()
        .toArray()
        .then(result=>{
            console.log(result);
            res.sendFile(__dirname + '/list.html');
        });
});

app.get('/enter', function(req, res){
    res.sendFile(__dirname + '/enter.html');
});    

app.post('/save', function(req, res){
    //console.log('저장완료');
    //console.log(req);
    
    // 몽고DB에 저장
    mydb.collection('post').insertOne(
        {title : req.body.title,
        content : req.body.content})
        .then(result => {
            console.log(result);
            console.log('데이터 추가 성공');
    });
    res.send('데이터 추가 성공');
});