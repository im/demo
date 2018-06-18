/*
* 判断两个对象是否相等 如：{x : 1, y :2 } 等于 { y : 2, x: 1 } ，但是它不等于 { x : 2, y :2 }, { x : 1 , y : 2, z : 3}
* */

var obj1 = {a: 1,b:2};
var obj2 = {b: 2,a:1};
var obj3 = {b: 2,a:1,y:4};


function isEqui(obj1,obj2){
    if(Object.keys(obj1).length != Object.keys(obj2).length){
        return false;
    }
    for(var attr in obj1){
        if(obj2[attr] && obj1[attr] != obj2[attr] ){
            return false;
        }
    }
    return true;
}

console.log(isEqui(obj1,obj2))

