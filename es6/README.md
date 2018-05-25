# es6 基础学习

### let , const 
* let : 用于声明一个变量，和var差不多
    * 使用let声明的变量，所声明的变量只在所在的代码快内有效
    * 使用let声明的变量在预解析的时候不会被提升
    * let 不允许在同一个作用域下声明已存在的变量
* const : 声明一个常量，常量就是不可以变化的量
    * 声明的时候必须赋值
    * 声明常量储存简单的数据类型值是不可以改变的，如果储存的是对象，对象引用是不可以改变，对象里面的数据如何改变是没关系的。
    
### 变量的解构赋值

解构赋值 ： 本质上就是一种匹配模式，只要等号两边的模式相同，那么左边的变量就可以被赋予对应的值

解构赋值主要分为：

* 数组的解构赋值

    ```javascript
    let [a,b,c] = [1,2,3];
    let [a,[b],c] = [1,[2],3]
    let [,,c] = [1,2,3]
    let [y =1 ] = []; //默认赋值
    ```
* 对象的解构赋值

    ```javascript
    let {a,b,c} = {a:1,b:2,c:3}
    ```
* 基本类型的解构赋值

    ```javascript
    let [a,b,c] = 'abc'
    ```
### 数据解构Set 
集合的基本概念：集合是由一组无序且唯一（既不能重复）的项组成，这个数据结构使用了与有限集合相同的数学概念，应用在计算机的数据结构中   
ES6提供了数据结构set,它类似于数组，但是成员的值都是唯一的，没有重复的值

> 可以使用set来做数据去重，因为set成员的值是唯一的

属性: 

* size 获取set的大小， 跟数组的length相似
    
方法:

* Set([1]).add(value) 添加一个数据，返回set结构本身(可以链式操作)
* Set([1]).delete(value) 删除指定数据，返回一个布尔值，表示删除师傅成功
* Set([1]).has(value) 判断该值是否为set的成员，返回一个布尔值
* Set([1]).clear() 清楚set所有数据 没有返回值
* Set([1]).keys()  返回键名的遍历器
* Set([1]).values()  返回键值的遍历器
* Set([1]).entries()  返回键值对的遍历器
* Set([1]).forEach((value,key,set)=>{})  使用回调函数遍历每个成员


### 数据结构Map （字典类型的数据结构）
字典：是用来储存不重复key的hash结构，不同于集合set的是，字典使用的是[键,值]的形式来储存数据结构    

javascript的对象object:{} 只能使用字符串当做键，这给他的使用带来了很大的现在
为了解决这个问题，es6提供了map数据结构，它类似于对象，也是键值对的集合，但是键的范围不限制于字符串，各种类型的值（包括对象），都可以当做键，也就是说，object结构提供了“字符串-值”的对应，map结构提供了“值-值”的对应，是一种更完善的hash结构实现。如果你需要键值对的数据结构，map比object更合适

属性: 

* size 获取set的大小， 跟数组的length相似

方法:

* map.set('name','xiaomi') 添加一个数据，返回map结构本身(可以链式操作)
* map.get('name') 读取key对应的值，如果找不到key,返回undefined
* map.delete('name') 删除某个key ,返回布尔值，如果删除失败 返回false
* map.has('name') 方法返回一个布尔值，表示某个键值是否在当前map对象之中
* map.clear() 清楚map所有数据 没有返回值
* map.keys()  返回键名的遍历器
* map.values()  返回键值的遍历器
* map.entries()  返回键值对的遍历器
* map.forEach((value,key,map)=>{})

注意事项 ：

* NaN 在map这个数据结构中，会解析成同一个键值，后面的会覆盖前面的  
* map的键是跟内存地址绑定的， 如果内存地址不一样，会解析成两个不一样的键
* 在map里面key的排列顺序是按照添加的顺序进行排列的 

### Iterator 和 for-of 循环  
基本概念：
    在es6中新增了set和map两种数据结构，再加上js之前原有的数组和对象，这样就有了四种数据集合，平时还可以组合使用它们，定义自己的数据结构，比如数组的成员是map, map的成员是对象，这样就需要一种统一的结构机制，来处理所有不同的数据结构

Iterator就是一种这样的机制，它是一种接口，为各种不同的数据类型提供相同的访问机制，任何的数据结构只要部署Iterator接口，就可以完成遍历操作，而且这种遍历操作是依次处理该数据结构的所有成员   

* iterator遍历过程

```javascript
const arr = [1,2,3]

function iterator(arr) {
    let index = 0;
    return {
        next :function () {
            return index < arr.length ? { value : arr[index++], done : false } : {value : undefined, done:true}
        }
    }
}
let it  = iterator(arr)

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
```

* 凡是具有Symbol.iterator 属性的数据结构度具有iterator接口

```javascript
const arr = [1,2,3];
const set = new Set(['a','b','c']);
const map = new Map([['a',1]]);

const isArr = arr[Symbol.iterator]();
const isSet = set[Symbol.iterator]();
const isMap = map[Symbol.iterator]();

console.log(isSet.next())
console.log(isSet.next())
console.log(isSet.next())
console.log(isSet.next())
```
* 具备iterator接口的数据结构都可以进行如下操作
    * 解构赋值

    ```javascript
     let [x,y] = set;
    ```
    * 扩展运算符
    
    ```javascript
     let str = 'xiaomi';
     let arrStr = [...str];
     console.log(arrStr);//['x','i','a','o','m','i'] 
    ```
* for ... of 凡是拥有iterator的数据结构都能使用for - of循环    
```javascript
const ofArr = [1,2,3];
for(let i of ofArr){
    console.log(i)//1,2,3
}
const ofMap = newMap([ ['a',1],['b',2],['c',3] ]);
for(let [key,value] of  ofMap ){
    console.log(key,value)
}
```
`object 没有提供iterator`

### class
JS语言的传统方法是通过构造函数，定义并生成新对象，是一种基于原型的面向对象系统。这种写法跟传统的面向对象语言（比如C++和Java）差异很大，很容易让新学习这门语言的人感到困惑。所以，在ES6中新增加了类的概念，可以使用 class 关键字声明一个类，之后以这个类来实例化对象。
js实列对象：
```javascript
const Miaov = function (a, b){
  this.a = a;
  this.b = b;
  return this;
};

Miaov.prototype = {
  constructor: Miaov,
  print: function (){
    console.log(this.a + ' ' + this.b);
  }
};


const miaov = new Miaov('hello', 'world').print();
```
class 语法 ：
```javascript
class Miaov {
  constructor(a, b){
    this.a = a;
    this.b = b;
    return this;
  }
  print(){
    console.log(this.a + ' ' + this.b);
  }
};

const miaov = new Miaov('hello', 'world').print();

console.log(typeof Miaov);
```
* Miaov中的constructor方法是构造方法，this关键字则代表实例对象。也就是说，ES5的构造函数Miaov，对应ES6的Miaov这个类的构造方法。
* Miaov这个类除了构造方法，还定义了一个print方法。注意，定义“类”的方法的时候，前面不需要加上function这个关键字，直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。
* 构造函数的prototype属性，在ES6的“类”上面继续存在。而且类的所有方法都定义在类的prototype属性上面。
* 定义在类中的方法都是不可以枚举的。
* constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
* 生成类的实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。


### Symbol

Symbol，表示独一无二的值。它是 JS 中的第七种数据类型。

基本的数据类型： Null Undefined Number Boolean String Symbol
引用数据类型：Object

注意事项：

* Symbol 函数前不能使用 new 否则会报错，原因在于 Symbol 是一个原始类型的值，不是对象。
* Symbol 不能做任何运算。
* Symbol 函数接收一个字符串作为参数，表示对Symbol的描述，主要是为了在控制台显示，或者转为字符串的时候，比较容易区分
   
### 内置对象扩展

#### 字符串的扩展

* 模板字符串 ${ var b = 1; }
* repeat 对字符串重复操作

    ```javascript
    let str = 'a';
    str.repeat(3); // 'aaa'
    ```
* includes  查找字符串是否包含字符， 返回布尔值
    ```javascript
    let str = 'abc';
    str.includes('b'); // true
    
    ```
* startsWith  查找字符串开头是否包含字符， 返回布尔值
    ```javascript
    let str = 'abc';
    str.startsWith('b'); // false
    
    ```
* endWith  查找字符串结尾是否包含字符， 返回布尔值
    ```javascript
    let str = 'abc';
    str.startsWith('b'); // false
    
    ```
    
#### 数组的扩展
* Array.from() 将类数组转换成数组, 返回新的数组
* Array.of() 创建一个数组，跟[] 一样
* Array.find() 查找数组内符合条件的第一个元素 未找到返回undefined
    ```javascript
    let arr = [2,3,4];
    let res = arr.find((a)=>{
        return a < 3;

    })
    console.log(res) //2    
    ```
* Array.findIndex() 查找数组内符合条件的第一个元素的下标 未找到返回-1
    ```javascript
    let arr = ['a',2,3,4];
    let res = arr.findIndex((a)=>{
        return a < 3;
    })
    console.log(res) //1
    
    ```
* Array.fill('替换的字符',开始的下标,结束的下标) 替换数组的值   

    ```javascript
      let arr1 = ['a',2,3,4];
      console.log(arr1.fill('xiaomi',1,3))    //["a", "xiaomi", "xiaomi", 4] 
    ```
#### 对象的扩展

* 对象简介表示法
    ```javascript
    const obj = {
      a: a
    };
    
    const obj = {a}
    
    console.log(obj);
    
    const obj = {
      fn: function (){
        console.log(1);
      },
      fn2(){
        console.log(2);
      }
    }
    
    obj.fn();
    obj.fn2();
    ```
* Object.is() 比较两个对象是否长得一样    
* Object.assing() 用于对象的合并，将源对象的所有可枚举属性，复制到目标对象。  
    ```javascript
    let obj1 = {a: 1};
    let obj2 = {a: 2, b: 3};
    let obj3 = {c: 'abc'};
    
    Object.assign(obj1, obj2, obj3);
    
    console.log(obj1);    
    ```
### 函数扩展、箭头函数

* 为函数指定默认值
    ```javascript
    function fn(a = 10, b = 20){
      console.log(a + b);
    }
    
    fn();
    fn(0, 10);

    ```
    
* 函数得rest参数
    rest 参数形式为（“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
    ```javascript
    function sum(a, ...arr, b){
      var res = a;
      for(var i=0; i<arr.length; i++){
        res += arr[i];
      }
      console.log(res);
    }
    
    sum(10, 1, 2, 3, 4, 5);    
    ```
    
* 箭头函数

    ```javascript
    
    const fn = a => a
  
    const fn = (a, b) => a + b
    
    const fn = (a, b) => {
      a = a * 2;
      b = b * 2;
      return a + b;
    }
    
    //返回对象需要用小括号包裹起来
    const fn = (a, b) => ({a, b});
 
    
    arr.sort((a, b) => a - b);
    ```
    
    箭头函数注意事项：
    * 箭头函数体内没有自己的this对象，所以在使用的时候，其内部的this就是定义时所在环境的对象，而不是使用时所在环境的对象。
        
    ```javascript
    function fn(){
      setTimeout(function (){
        console.log(this);
      }, 1000);
      setTimeout(() => {
        console.log(this);
      },1000);
    }
    
    var obj = {a: 1};
    
    fn.call(obj);    
    ```
        
    * 不能给箭头函数使用 call apply bind 去改变其内部的this指向
    * 箭头函数体内没有`arguments`对象，如果要用，可以用Rest参数代替。
    * 不可以当作构造函数，不可以使用`new`命令，否则会抛出一个错误。 
    * 箭头函数不能用作Generator函数   

### Promise
* 基本概念
    `promise`是es6中新增的异步变成解决方案，提现在代码中它是一个对象，可以通过`promise`构造函数来实例化

* 使用方法
   
   ```javascript
    const imgs = [
       'http://i1.piimg.com/1949/4f411ed22ce88950.jpg',
       'http://i1.piimg.com/1949/5a35e8c2b246ba6f.jpg',
       'http://i1.piimg.com/1949/1afc870a86dfec5f.jpg'
   ];
    const p = new Promise(function (resolve, reject){
      const img = new Image();
      img.src = '';
      img.onload = function (){
        resolve(this);
      };
      img.onerror = function (){
        reject(new Error('图片加载失败'));
      };
    });

    console.log(123);

    p.then(function (img){
      console.log('加载完成');
      document.body.appendChild(img)
    }).catch(function (err){
      console.log(err);
    })

    console.log(456);   
   ```
* Promise.all 
    - Promise.all 可以将多个Promise实例包装成一个新的Promise实例
    - 当所有Promise实例的状态都变成resolved，Promise.all的状态才会变成resolved，此时返回值组成一个数组，传递给then中的resolve函数。
    - 只要其中有一个被rejected，Promise.all的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
    
    ```javascript
    const imgs = [
        'http://i1.piimg.com/1949/4f411ed22ce88950.jpg',
        'http://i1.piimg.com/1949/5a35e8c2b246ba6f.jpg',
        'http://i1.piimg.com/1949/1afc870a86dfec5f.jpg'
    ];
    function loadImg(url) {
        const p = new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = url;
            img.onload = function () {
                resolve(this);
            };
            img.onerror = function () {
                reject(new Error('图片加载失败'));
            };
        });
        return p;
    }   
  const allDone = Promise.all([loadImg(imgs[0]), loadImg(imgs[1]), loadImg('')]);
  //只有所有的图片请求成功promise.all才会执行then
    allDone.then(function (datas){
      datas.forEach(function(item, i) {
        document.body.appendChild(item);
      });
    }).catch(function (err){
      console.log(err);
    })
    ```
    
       
   