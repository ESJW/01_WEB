let userName = '이창현';
let userPW = '1111';

function account(userId, userPW){
    let savedName = '이창현';
    let savedPW = '1111';
    
    if(userId == savedName){
        if(userPW == savedPW){
            console.log('반갑습니다. ' + userId + '님');
        }
    }
}

account(userName, userPW);