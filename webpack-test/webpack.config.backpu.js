var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    /**
     * 指定项目打包是从哪个文件开始
     * entry 可以指定三种方式 string  array object
     * entry : './src/script/main.js' 单独一个文件打包
     * entry: ['./src/script/main.js','./src/script/a.js'] 将两个没有依赖，不相关的文件打包到一起
     * entry: {  方便应用到多页面 输出不同的多个文件
     *      page1 : './src/script/main.js',
     *      page2 : ['./src/script/main.js','./src/script/a.js'],
     * }
     */

    entry: {
        page1: './src/script/main.js',
        page2: ['./src/script/main.js', './src/script/a.js'],
        page3: ['./src/script/main.js', './src/script/a.js'],
    },

    //打包后输出配置
    output: {
        //输出路径
        path: path.resolve(__dirname, './dist'),
        //理解为占位符， 会替换文件路径
        publicPath : 'http://',
        /*
         * 输出名字 输入输出的文件是多个，需要使用[name] 来将名字替换区分
         * [name]  名字
         * [hash]  当前打包的hash值
         * [chunkhash] 生成文件的md5值 可以用来做显示版本控制，每次文件如果有修改 这个hash值是不一样的
         */
        filename: 'js/[name]-[chunkhash].bundle.js'
    },
    /*
    * webpack 插件
    *
    * */
    plugins: [
        /*
        * 生成html 关联JS文件
        *
        * */
        new htmlWebpackPlugin({
            //指定文件名
            filename:'index-demo.html',
            //指定模板文件
            template: 'index.html',
            //指定JS输出在那个标签里面
            inject :'head',
            //将属性传递到模板html文件里面  模板页面获取方式 <%= htmlWebpackPlugin.options.title %>
            title :'webpack htmlwebpack-plugin',
            //对生成的html压缩
            minify :{
                //删除注释
                removeComments : true,
                //删除空格
                collapseWhitespace:true
            },
            //给模板指定js， 调用的资源
            chunks : []
        })
    ]

}