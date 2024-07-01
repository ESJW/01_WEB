const readline = require('readline');

const rl=readline.createInterface({
    input : process.stdin,
    output: process.stdout 
});

rl.question("정수를 입력하시오,:", function(num){
    num=num%2;
    if(num){
        console.log("홀수 입니다");
    } else{
        console.log("짝수 입니다");
    }
    rl.close();
});

// rl.question('프로그래밍 언어 이름을 입력하시오,: ',function(data){
// 	console.log('가장 좋아하는 프로그래밍 언어는 ' + data + '입니다.');
//   	rl.close();
// });
// question(메시지, 호출해서 어떤 작업을 할것인지)
// function은 호출된게 아니라 정의만 해둔 상태
// 어떤 조건을 만족하면 하게될 작업 (call back function)