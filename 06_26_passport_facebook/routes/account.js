const router = require('express').Router();

router.get('/login', (req, res) =>{
    if(req.session.user){
      //res.send('이미 로그인 되어있습니다.');
      res.render('index.ejs', {user:req.session.user});
    }else{
      res.render('login');
    }
  });
  
  router.post('/login', (req, res) =>{
    //console.log(req.body);
    mydb.collection('account')
      .findOne({userid:req.body.userid})
      .then(result => {
        //console.log(result);
        let salt;
        const sql = `select salt from UserSalt
                          where userid=?`;
        mysqlconn.query(sql, [req.body.userid], (err, rows, fields)=>{
          console.log(rows);
          salt = rows[0].salt;
          // 입력한 pw를 hash로 변경
          const hashPw = sha(req.body.userpw + salt);
          if(result != null && result.userpw == hashPw){
            //req.session.userid = req.body.userid;
            req.body.userpw = hashPw;
            req.session.user = req.body;
            //console.log(req.session);
            console.log('새로운 로그인');
            //res.send(`${req.session.user.userid}님 환영합니다.`);
            res.render('index.ejs', {user:req.session.user});
          }else{
            //res.send('login fail');
            res.render('login.ejs');
          }
        });
      })
      .catch(err=>{
        console.log(err);
        res.status(500).send();
      });
  });

  router.get('/logout', (req, res)=>{
    console.log('로그아웃');
    req.session.destroy();
    //res.redirect('/');
    res.render('index.ejs', {user:null});
  });

module.exports = router;