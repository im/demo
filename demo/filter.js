//filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
let arr = [1,23,3,4,5,12,3];
let newArr = arr.filter((value,index,a)=>{
    return value > 4;
})
console.log(newArr)