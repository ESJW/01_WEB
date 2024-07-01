const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // 연결 url

let mydb;

mongoclient.connect(url)
    .then(client => {
        console.log('몽고DB 접속 성공');
        mydb = client.db('mini');
        
        app.listen(8080, function(){
            console.log('8080 server ready...');
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/list', function(req, res){
    mydb.collection('list')
        .find()
        .toArray()
        .then(result =>{
            res.render('list.ejs', {data:result});
    });
});
    

app.get('/enter', function(req, res){
    res.render('enter.ejs');
});

app.post('/save', function(req, res){
    let today = new Date();
    //console.log(today.toLocaleString());
    //console.log(req.body);

    mydb.collection('list').insertOne({
        place:req.body.place,   // 장소
        price:req.body.price,   // 가격
        size:req.body.size,     // 평수
        content:req.body.content,// 설명
        date:today.toLocaleString(),// 작성일
        category:req.body.radio,    // 항목
    }).then(result=>{
        console.log('저장완료', result);
        res.redirect('/list');
    });
});

app.get('/content/:_id', (req, res) => {
    mydb.collection('list')
        .findOne({_id:new ObjId(req.params._id)})
        .then(result => {
            res.render('content.ejs', {data:result});
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.get('/edit/:_id', (req,res)=>{
    mydb.collection('list')
        .findOne({_id:new ObjId(req.params._id)})
        .then(result => {
            res.render('edit.ejs', {data:result});
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.post('/edit', (req, res) => {
    //console.log(req.body);
    mydb.collection('list')
        .updateOne(
            {_id:new ObjId(req.body._id)},
            {$set:{
                place:req.body.place,   // 장소
                price:req.body.price,   // 가격
                size:req.body.size,     // 평수
                content:req.body.content,// 설명
                } }
        )
        .then(result => {
            console.log('수정완료');
            res.redirect('/list');
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.post('/delete', (req, res) => {
    req.body._id = new ObjId(req.body._id);

    mydb.collection('list')
        .deleteOne(req.body)
        .then(result => {
            console.log('삭제 완료');
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.get('/bank',(req,res)=>{
    res.render('mybank.ejs');
})