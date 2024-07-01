let obj = {
    myVar: 'foo',

    myFunc: function(){
        
        console.log(this.myVar);    // 수행 컨텍스트가 obj
        
        setTimeout(function(){
            console.log(this.myVar);// 수행 컨텍스트가 window
        }, 1000);
      
      	setTimeout(() => {  // 화살표 함수, function() 객체가
            console.log(this.myVar);// 수행 컨텍스트가 obj
        }, 1000);
    }
}

obj.myFunc();   // foo   undefined   foo