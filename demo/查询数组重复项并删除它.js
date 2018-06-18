/*
* 找出数组中重复项，并删除它，只能在原数组上操作
*
* */

let arr = [1,2,3,2,4,5];



function uniq(arr){
    let obj = {};

    arr.map((item,index)=>{
        if(obj[item]){
            obj[item].push(index)
        }else{
            obj[item] = [index]
        }
    })

    for(let attr in obj){
        if(obj[attr].length > 1){
            let newArr = obj[attr];
            for(let i = 0; i< newArr.length;i++){
                if(i >= 1){
                    newArr[i] = newArr[i] -1
                }
                arr.splice(newArr[i],1)
            }
        }
    }
    return arr;
}

console.log(uniq(arr))

