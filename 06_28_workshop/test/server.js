const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB 연결 URI
const uri = 'mongodb+srv://admin:1234@cluster0.gnyth4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // MongoDB 주소와 포트
const dbName = 'myboard'; // 데이터베이스 이름
const collectionName = 'asset'; // 컬렉션 이름

app.use(cookieParser());
app.use(express.static('public')); // static 파일 서빙을 위한 디렉토리 설정

// EJS를 사용하여 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우터 설정
app.get('/', (req, res) => {
  res.render('asset');
});

app.get('/get-money', async (req, res) => {
  // 쿠키에서 UID 가져오기
  const uid = req.cookies.uid;
  if (!uid) {
    return res.status(400).send('UID 쿠키가 없습니다.');
  }

  // MongoDB 클라이언트 생성
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // MongoDB 연결
    await client.connect();
    console.log('MongoDB에 연결되었습니다.');

    // 데이터베이스와 컬렉션 선택
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // UID를 이용한 쿼리 수행
    const query = { uid: uid };
    const user = await collection.findOne(query, { projection: { money: 1, _id: 0 } });

    console.log('MongoDB query result:', user);

    if (user) {
      res.json({ money: user.money }); // JSON 형식으로 응답
    } else {
      res.status(404).send('사용자를 찾을 수 없습니다.');
    }
  } catch (err) {
    console.error('MongoDB 쿼리 오류:', err); // 오류 로그 추가
    res.status(500).send('서버 오류');
  } finally {
    // MongoDB 클라이언트 종료
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
