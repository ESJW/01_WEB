// function c(){
//     console.log('c');
// }
// function b(){
//     console.log('b');
// }
// function a(){
//     console.log('a');
// }

// setTimeout(a, 3000);    // 3초 뒤에 a 실행
// setTimeout(b, 2000);    // 2초 뒤에 b 실행
// setTimeout(c, 1000);    // 1초 뒤에 c 실행
// // 예상: 3초 뒤 a 출력, 2초 뒤 b 출력, 1초 뒤 c 출력(동기)
// // 실제 실행 결과: c b a 1초 간격으로 출력 (비동기)

// setTimeout(function(){
//     console.log('a');
//     setTimeout(function(){
//         console.log('b');
//         setTimeout(function(){
//             console.log('c');
//         }, 1000);
//     }, 2000);
// }, 3000);

function f(flag, time){
    return new Promise((resolve, reject) => {   
        if(flag){
            setTimeout(resolve, time);
        }else{
            reject('처리 오류');
        }
    });
}

f(true, 3000)
    .then(function(){ 
        console.log('a');     
        return f(true, 2000);   // then을 한번 더 쓰기 위함
    })
    .then(function(){
        console.log('b');
        return f(true, 1000);
    })
    .then(function(){
        console.log('c');
    })
    .catch(function(errMsg){  
        console.log(errMsg);
    });