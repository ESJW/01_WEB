const unit = {
    attack: function (weapon){
        return `${weapon}으로 공격한다.`;
    }
};

console.log(unit);  // 객체 서술
console.log(unit.attack);   // 객체 프로퍼티 서술
console.log(unit.attack('총')); // 객체 메서드 호출 결과값 출력
