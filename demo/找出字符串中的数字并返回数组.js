/*
* 找出字符串中的数字，并返回数组
* var str ="d567unt7jk80o9hkghftjs123ldka78sdassdfd653";
* 返回[123,78,653]
* */


var str = "d567unt7jk80o9hkghftjs123ldka78sdassdfd653";


console.log(str.match(/\d+/g))

function test(str){
    var ret = [];
    var isNum = false;
    for(var i = 0, iLen = str.length; i < iLen; i++){
        var charCode = str.charCodeAt(i);
        if(charCode >= 48 && charCode <= 57){
            if(isNum){
                ret[ret.length - 1] += str[i];
            }else{
                ret.push(str[i]);
            }
            isNum = true;
        }else{
            isNum = false;
        }
    }
    return ret;
}

console.log(test(str))