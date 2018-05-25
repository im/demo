var arr = [1, 2, 3, 4, 5];

Array.prototype.duplicator = function () {
    return this.concat(this);
}

console.log(arr.duplicator())

var abc = 'abc';

String.prototype.duplicator = function (n) {
    if(!n){
        return this + this
    }else{
        let s = '';
        for(let i = 0; i<= n;i++){
            s+= this;
        }
        return s;

    }

}


console.log(abc.duplicator(10))