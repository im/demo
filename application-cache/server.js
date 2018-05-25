var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var http = require("http"),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
//定义简单的工具
//获取当前时间
var date = function (ms) {
    var date = ms ? new Date(ms) : new Date(),
        mon = date.getMonth() >= 10 + 1 ? '-' : '-0',
        d = date.getDate() >= 10 ? '-' : '-0',
        hour = date.getHours() >= 10 ? ' ' : ' 0',
        min = date.getMinutes() >= 10 ? ':' : ':0',
        sec = date.getSeconds() >= 10 ? ':' : ':0';
    return date.getFullYear() + mon + (date.getMonth() + 1) + d + date.getDate() + hour + date.getHours() + min + date.getMinutes() + sec + date.getSeconds();
};
function DebugLog(mes) {
    var now = date();
    console.log(now + " " + mes);
};
//服务监听
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname,//获取url中的文件名
        pathname = (pathname !== "/" && pathname) ? pathname : "/index.html";//处理链接以'/'结尾的情况
    var realPath = path.join("./", path.normalize(pathname.replace(/\.\./g, ""))),//将链接转换成物理路径
        ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';//获取文件扩展名

    //查找文件
    fs.exists(realPath, function (exists) {
        if (!exists) {//处理404
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write("This request URL " + pathname + " was not found on this server.");
            res.end();
        } else {//读取文件
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {//程序出错报500错误
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end(err);
                } else {//正常返回文件
                    var contentType = mine[ext] || "text/plain";//根据mine.js中的配置设置对应的contentType
                    res.writeHead(200, {
                        'Content-Type': contentType
                    });
                    res.write(file, "binary");
                    res.end();
                }
            });
        }
    });
}).listen(8080);

DebugLog("http服务启动，开始监听127.0.0.1:8080的http请求！");