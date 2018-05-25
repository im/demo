let https = require('https');
let stringArr = require("./stringArr")();
let stringArrA = require("./stringArrA")();
let numberArr = require("./numberArr")();
let numberArrA = require("./numberArrA")();

let allArr = [];
allArr = stringArrA.concat(numberArr,numberArrA)

let strLen = allArr.length
let currentIndex = 0;

module.exports = function (mongo) {



    function run (){

        if(currentIndex >= strLen){
            return;
        }
        let s = allArr[currentIndex];

        https.get("https://github.com/" + s, function (res) {
            let str = "";

            res.on("data", function (data) {
                str += data;
            });

            res.on("end", function () {

                let isGit = str.includes('parallax_error_text');
                let json = {
                    str: s,
                    url: "https://github.com/" + s
                }
                if (isGit) {



                    currentIndex++;
                    run();

                    //查找这个域名是否存在
                    mongo.findOne({str: json.str}, function (err, isgit) {
                        if (err) {
                            return;
                        }
                        if (!isgit) {
                            mongo.create(json, (err, github) => {
                                if (err) {

                                    console.log(err)
                                    currentIndex++;
                                    run();
                                } else {
                                    console.log( currentIndex + '成功:[' + json.url +']')
                                    currentIndex++;
                                    run();
                                }
                            })
                        }
                    })

                }else{
                    console.log( currentIndex + '失败:[' + json.url +']')
                    currentIndex++;
                    run();
                }
            });
        });

    }

    run ();

}