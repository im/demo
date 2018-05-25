
//es module
import sum from './sum';

sum(1,2);

//common
var minus = require('./minus');

minus(3,4);

//amd
require(['./muti'],function(muti){
    muti(10,20);
})
