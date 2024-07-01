let id = 'jamsu';
let pw = '1111';

let user = {
    id,
    pw,
    name: '1ch',
    mobile: '010-1111-1111',
    country: '대한민국'
}

console.log(user);
for(let info in user){
    console.log(`${info} : ${user[info]}`);
}