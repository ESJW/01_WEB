const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dic = {
    boy: '소년',
    girl: '소녀',
    friend: '친구'
};

rl.question('무조건 천원! 상품 입력? ', function(obj){
    let basket = {
        [obj] : "1000원",
    }
    console.log(basket[obj]);

    rl.close();
})