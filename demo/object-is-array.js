//Js中如何判断一个对象为数组类型

let arr = new Array();
let arr1 = [];
let arr2 = Array.of(1);
//方法一：

console.log('========== 方法一 instanceof========== ')
console.log(arr instanceof Array)
console.log(arr1 instanceof Array)
console.log(arr2 instanceof Array)


//方法二：
console.log('========== 方法二 constructor========== ')
console.log(arr.constructor == Array)
console.log(arr1.constructor == Array)
console.log(arr2.constructor == Array)

//方法三：
console.log('========== 方法三 Object.prototype.toString ========== ')

console.log(Object.prototype.toString.call(arr) == '[object Array]')
console.log(Object.prototype.toString.call(arr1) == '[object Array]')
console.log(Object.prototype.toString.call(arr2) == '[object Array]')


