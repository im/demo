



module.exports = function () {
    let arr = [];
    let str = 0;
    for(let k = 0; k<= 9;k++){
        str = '';
        for(let i=0;i<=4;i++){
            str += ''+k;
            if( i > 1){
                arr.push(str)
            }

        }
    }

    return arr;
}