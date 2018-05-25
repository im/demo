//冒泡排序

function bubbleSort(array) {

    let i, j;

    for (i = 0; i < array.length; i++) { //拿当前数组的每一项 跟数组所有的项作对比， 如果当前项大于比较项 将两者位置交换
        for (j = i + 1; j < array.length; j++) {
            let cur = array[i]
            if (cur > array[j]) {
                var tmp = array[j];
                array[j] = cur
                array[i] = tmp

            }

        }

    }

    return array

}

function quickSort(array) {

    if (array.length <= 1) {
        return array
    }

    var len = Math.floor(array.length / 2);
    // 截取中间值
    var cur = array.splice(len, 1); //splice 改变原有数组  slice不改变原来的数组

    // 小于中间值放这里面
    var left = [];
    // 大于的放着里面
    var right = [];
    for (let i = 0; i < array.length; i++) {
        if (cur > array[i]) {
            left.push(array[i])
        } else {
            right.push(array[i])
        }

    }

    return quickSort(left).concat(cur,quickSort(right))


}

let arr = [9, 7, 6, 5, 4, 1, 3, 2, 8, 10];

console.log(bubbleSort(arr))
console.log(quickSort(arr))

