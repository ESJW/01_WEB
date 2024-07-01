function account(userId){
    let savedUser='이은성';
    if(userId==savedUser){
        console.log('반갑습니다 ', savedUser, '님');
    } else{
        console.log('fail');
    }
}
account('이은성');