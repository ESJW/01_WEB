const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

//app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
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
            // console.log(result);
            // res.sendFile(__dirname + '/list.html');
            res.render('list.ejs', {data:result});
            // list.ejs를 html로 전환하여 화면에 나타냄
    });
});

app.get('/enter', function(req, res){
    res.render('enter.ejs');
});

app.post('/save', function(req, res){
    // console.log(req.body);  // 어떤 data가 넘어왔는지
    mydb.collection('post').insertOne({
        title:req.body.title,
        content:req.body.content,
        date:req.body.someDate, // date 추가
    }).then(result=>{
        console.log('저장완료', result);
        res.send('데이터 추가 성공');
    });
    // console.log('저장완료', req.body);
    // res.send('ok');
});

app.post('/delete', (req, res) => {
    // console.log(req.body._id);  // 문자열
    req.body._id = new ObjId(req.body._id);
    // console.log(req.body._id);  // 객체

    mydb.collection('post')
        .deleteOne(req.body)    // req.body._id로 넘기면 값만 넘어가버림
        .then(result => {
            console.log('삭제 완료');
            res.status(200).send();
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.get('/content/:_id', (req, res) => {
    mydb.collection('post')
        .findOne({_id:new ObjId(req.params._id)})
        .then(result => {
            res.render('content.ejs', {data:result});
        })
        .catch(err => {
            res.status(500).send();
        });
});

app.get('/edit/:_id', (req,res)=>{
    console.log(req.query);
    // mydb.collection('post')
    //     .findOne({_id:new ObjId(req.params._id)})
    //     .then(result => {
    //         // console.log(result);
    //         res.render('edit.ejs', {data:result});
    //     })
    //     .catch(err => {
    //         res.status(500).send();
    //     });
    res.render('edit.ejs', {data:req.query})
});

app.post('/edit', (req, res) => {
    console.log(req.body);
    mydb.collection('post')
        .updateOne(
            {_id:new ObjId(req.body._id)},
            {$set:{title:req.body.title, content:req.body.content, date:req.body.someDate } }
        )
        .then(result => {
            console.log('수정완료');
            res.redirect('/list');
        })
        .catch(err => {
            res.status(500).send();
        });
});

