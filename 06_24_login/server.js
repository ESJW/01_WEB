const mongoclient = require("mongodb").MongoClient;
const ObjId = require("mongodb").ObjectId;
const url = `mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let mydb;
mongoclient
  .connect(url)
  .then((client) => {
    mydb = client.db("myboard");
    // mydb.collection('post').find().toArray().then(result =>{
    //     console.log(result);
    // })
    console.log("mongodb ok ");
    app.listen(8080, function () {
      console.log("포트 8080으로 서버 대기중 ... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const express = require("express");
const app = express();

app.use(express.static('public'));  // static 미들웨어 설정

//body-parser 라이브러리 추가
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let session = require("express-session");
app.use(
  session({
  secret : 'asdfasdfasf',
  resave : false,   // 접속할 때마다 새로운 세션id 발급 여부
  saveUninitialized: true,  // 세션 사용하기 전까지 세션id 발급 안함
  })
);


app.get("/book", function (req, res) {
  res.send("도서 목록 관련 페이지입니다.");
});
app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/list", function (req, res) {
  //   conn.query("select * from post", function (err, rows, fields) {
  //     if (err) throw err;
  //     console.log(rows);
  //   });
  list(req, res);
});

function list(req, res){
  mydb
    .collection("post")
    .find()
    .toArray()
    .then((result) => {
      // console.log(result);
      res.render("list.ejs", { data: result });
    });
}

//'/enter' 요청에 대한 처리 루틴
app.get("/enter", function (req, res) {
  // res.sendFile(__dirname + '/enter.html');
  res.render("enter.ejs");
});

//'/save' 요청에 대한 post 방식의 처리 루틴
app.post("/save", function (req, res) {
  // console.log(req.body.title);
  // console.log(req.body.content);

  mydb
    .collection("post")
    .insertOne({ title: req.body.title, content: req.body.content, date: req.body.someDate })
    .then((result) => {
      //console.log(result);
      console.log("데이터 추가 성공");
      //res.send("데이터 추가 성공");
      list(req,res);
    });  
});

app.post("/delete", function (req, res) {
  console.log(req.body);
  req.body._id = new ObjId(req.body._id);
  mydb
    .collection("post")
    .deleteOne(req.body)
    .then((result) => {
      console.log("삭제완료");
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

// app.get('/content/:_id', (req, res) => {
//   console.log(req.params._id);
//   mydb.collection('post')
//     .findOne({_id:new ObjId(req.params._id)})
//     .then(result => {
//       res.render('content.ejs',{data:result});
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send();
//     });
  
// });

// app.post('/edit', (req, res) => {
//   console.log(req.body);
//   res.render('edit.ejs', {data:req.body})
// });

app.post('/update', (req, res) =>{
  console.log(req.body);
  mydb.collection('post')
    .updateOne({_id:new ObjId(req.body._id)},
    {$set: {title:req.body.title, content:req.body.content, date:req.body.someDate} })
    .then(result => {
      //res.redirect('/list');
      list(req,res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

app.get("/login", (req, res) =>{
  console.log(req.session);
  if(req.session.user){
    console.log('세션 유지');
    res.render('index.ejs', {user : req.session.user});
  }else{
    res.render('login.ejs');
  }
});

app.post('/login', (req, res) =>{
  console.log('아이디 : '+ req.body.userid);
  console.log('비밀번호 : '+ req.body.userpw);

  mydb
    .collection('account')
    .findOne({userid : req.body.userid})
    .then(result => {
      if(result.userpw == req.body.userpw){
        req.session.user = req.body;
        console.log('새로운 로그인');
        res.render('index.ejs', {user:req.session.user});
      }else{
        res.render('login.ejs');
      }
    });
});

app.get('/logout', (req, res) => {
  console.log('로그아웃');
  req.session.destroy();  // 세션 삭제
  res.render('index.ejs', {user:null});
});

////////////// cookie test
const cookieParser = require('cookie-parser');

app.use(cookieParser('암호화키'));  // 암호화키 부분에는 아무거나 들어가도 됨
app.get('/cookie', (req,res)=>{
  let milk = parseInt(req.signedCookies.milk) + 1000; // 암호화된 쿠키값
  if(isNaN(milk)){
    milk = 0;
  }
  res.cookie('milk', milk, {signed:true});  // 암호화하여 보이게
  //res.cookie('name', '이지우');
  //res.send('쿠키 설정 완료');
  res.send('product : ' + req.signedCookies.milk + " / name : " + req.cookies.name);
  // send는 두번 실행 안됨
});

////////// session



app.get("/session", function (req, res) {
  console.log(req.session.milk);
  if(isNaN(req.session.milk)){
    req.session.milk = 0;
  }
  req.session.milk = req.session.milk + 1000;
  res.send("session : " + req.session.milk + "원");
});