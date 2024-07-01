const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const mongoclient = require('mongodb').MongoClient;
const url = `mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // 연결 url

let mydb;

mongoclient.connect(url)
    .then(client => {
        console.log('몽고DB 접속 성공');
        mydb = client.db('myboard');
        
        app.listen(8080, function(){
            console.log('8080 server ready...');
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/list', function(req, res){
    mydb.collection('post')
        .find()
        .toArray()
        .then(result =>{
            console.log(result);
            // res.sendFile(__dirname + '/list.html');
            res.render('list.ejs', {data:result});
            // list.ejs를 html로 전환하여 화면에 나타냄
    });
});

app.get('/enter', function(req, res){
    res.sendFile(__dirname + '/enter.html');
});

app.post('/save', function(req, res){
    mydb.collection('post').insertOne({
        title:req.body.title,
        content:req.body.content,
    }).then(result=>{
        console.log('저장완료', req.body);
        mydb.collection('post')
        .find()
        .toArray()
        .then(result =>{
            console.log(result);
            // res.sendFile(__dirname + '/list.html');
            res.render('list.ejs', {data:result});
            // list.ejs를 html로 전환하여 화면에 나타냄
    });
    });
    // console.log('저장완료', req.body);
    // res.send('ok');
});
