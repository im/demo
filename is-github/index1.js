var https = require('https');
//get 请求外网
/*
https.get('https://github.com/im', function (req, res) {

    var html = '';

    req.on('data', function (data) {

        html += data;

    });

    req.on('end', function () {
        console.log(html.includes('parallax_error_text'))
        // console.info(html);
    });
});*/
var str = [];
for (let i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i).toLocaleLowerCase());
}
for (let i = 0; i < str.length; i++) {
    request(str[i]);
}

function request(s) {
    let startTime = Date.now();

    https.get("https://github.com/"+s, function (res) {
        let str = "";

        res.on("data", function (data) {
            str += data;
        });

        res.on("end", function () {
            console.log("++++++++++++++++++++" +s);
            console.log(str.includes('parallax_error_text'))
            console.log(`time ${Date.now() - startTime}`);
            console.log("--------------------\r\n");
        });
    });
}



