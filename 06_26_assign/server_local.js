const fs = require("fs");
const https = require("https");

const express = require("express");
const app = express();

// SSL 인증서와 키 파일 읽기
const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
};

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const mongoclient = require("mongodb").MongoClient;
const url = `mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let mydb;
mongoclient.connect(url)
  .then((client) => {
    console.log("몽고DB 접속 성공");
    mydb = client.db("myboard");

    // HTTPS 서버 생성
    https.createServer(options, app).listen(443, () => {
      console.log("HTTPS Server running on port 443");
    });
  })
  .catch((err) => {
    console.log(err);
});

//////// passport 등록
const passport = require("passport");

const session = require("express-session");
app.use(
  session({
    secret: "암호화키",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(
  {
    usernameField: 'userid',
    passwordField: 'userpw',
    session: true,
    passReqToCallback: false,
  },
  // 전략 수행 함수
  function(inputid, inputpw, done){
    mydb.collection('account')
        .findOne({userid: inputid})
        .then((result)=>{
          if(result.userpw == inputpw){ // db == 입력값
            console.log('새로운 로그인');
            done(null, result);
          }else{
            done(null, false, {message: '비밀번호 틀렸어요'})
          }
        })
        .catch();
  }
));

passport.serializeUser(function(user, done){
  console.log('serializeUser');
  console.log(user);
  done(null, user.userid);
});

passport.deserializeUser(function(puserid, done){
  console.log('deserializeUser');
  console.log(puserid);

  mydb.collection('account')
    .findOne({userid: puserid})
    .then((result)=>{
      console.log(result);
      done(null, result);
    })
    .catch();
});
