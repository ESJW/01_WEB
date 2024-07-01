// let dic = new Object();

// dic.boy = '소년';
// dic.girl = '소녀';
// dic.friend = '친구';

const dic = {
    boy: '소년',
    girl: '소녀',
    friend: '친구'
};


dic.apple = '사과';
console.log(dic);

delete dic.girl;
dic.boy = '청년';
console.log(dic);

console.log(dic['boy']);