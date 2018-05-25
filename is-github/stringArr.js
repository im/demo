



module.exports = function () {
    let arr = [];
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 26; j++) {
            arr.push(String.fromCharCode(65 + i).toLocaleLowerCase() + String.fromCharCode(65 + j).toLocaleLowerCase())
        }
    }

    return arr;
}