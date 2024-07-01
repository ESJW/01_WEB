var dan = 2;
while(dan < 10){
    var num  = 1;
    while(num < 10){
        if(dan == 6 && num == 1)
            break;
        console.log(dan + '*' + num  + '=' + dan*num);
        num++;
    }
    dan++;
    alert();
}
