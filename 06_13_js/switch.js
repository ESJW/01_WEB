const readline = require('readline');
const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('C 드라이브를 포맷하시겠습니까? ',function(ch){
    switch(parseInt(ch)){   // parseInt 안쓰면 '유효하지 않은 문자입니다' 출력됨
        case 1:
            console.log("예, 드라이브를 포맷하겠습니다.");
            break;
        case 2:
            console.log("아니오, 드라이브를 포맷하지 않겠습니다.");
            break;
        default:
            console.log('유효하지 않은 문자입니다.');
            break;
    }
    rl.close();
});

