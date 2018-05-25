
function shallowObj(obj){


    let newObj = {};

    for ( let attr in obj) {

        newObj[attr] = obj[attr]

    }

    return newObj

}

function person(pname) {
    this.name = pname;
}

const Messi = new person('Messi');


let obj = {

    a : 1,
    b : [1,2,3],
    c : {
        d :[1,2,3],
        e : 'abcd',
        f : 4,
        h : false
    },
    ex :  new RegExp('ab+c', 'i'),
    messi : Messi

}

let a = shallowObj(obj);



let b = JSON.parse(JSON.stringify(obj));
/*
*   1.他无法实现对函数 、RegExp等特殊对象的克隆
*   2.会抛弃对象的constructor,所有的构造函数会指向Object
*   3.对象有循环引用,会报错
*
* */

console.log(b.messi.constructor,obj.messi.constructor)
