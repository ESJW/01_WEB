var arr=[];
console.log(arr.length);

var i=1;
for(;i<10;){
    arr.push("2 * " + i + " = " + (2*i));
    i++;
}

console.log(arr.length);

for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    console.log(element);
}