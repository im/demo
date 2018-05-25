



module.exports = function () {
    let arr = [];
    for(let i=0;i<=9;i++){
        arr.push(i+'')
        for(let j=0;j<=9;j++){
            arr.push(i + '' + j);
            /*for(let k = 0; k<= 9;k++){

                arr.push(i + '' + j + '' + k)
            }*/


        }
    }


    return arr;
}