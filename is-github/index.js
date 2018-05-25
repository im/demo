
let rq = require("./request");
let mongodbUrl =  'mongodb://localhost:27017/isgithub'

const mongoose = require('mongoose')

mongoose.connect(mongodbUrl,{useMongoClient:true})

var db = mongoose.connection;

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    console.log('连接成功');
})

const github = mongoose.Schema({

    str: String,
    url: String

})
var Github = mongoose.model('Github', github)


rq(Github)

