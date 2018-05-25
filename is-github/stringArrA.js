



module.exports = function () {
    let arr = [];
    let str = '';
    for (let i = 0; i < 26; i++) {
        str = '';
        for (let j = 0; j <= 4; j++) {
            str += String.fromCharCode(65 + i).toLocaleLowerCase();
            if( j > 1){
                arr.push(str)
            }
        }
    }

    return arr;
}