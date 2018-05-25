var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {


    entry: './src/app.js',

    //打包后输出配置
    output: {
        //输出路径
        path: path.resolve(__dirname, './dist'),

        filename: 'js/[name].bundle.js'
    },
    /*
    * loader
    *
    * */
    module: {
        //注意 webpack版本不一样 定义loader的方式也不一样 webpack2.0 是使用loaders定义 2.0以后使用rules
        rules: [
            {
                test: /\.js$/, //匹配正则
                exclude: /node_modules/, // 排除不用编译的文件夹
                include: /src/, //指定需要编译的文件夹
                loader: "babel-loader"
            },
            {
                test: /\.html$/,
                loader: "html-loader", //处理html文件  讲模板文件解析成字符串
            },
            {
                test: /\.ejs$/,
                loader: "ejs-loader", //处理html文件  讲模板文件解析成字符串
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader?importLoaders=1',  //importLoaders 如果css文件里面用import引入， 这个文件是不会经过css-loader后面的loader处理的，比如postcss, 如果想要处理import引入进来的文件 需要添加importLoaders importLoaders=1 表示cssloader 处理完之后再处理import进来的文件这个1表示 css-loader后边的第一个loader
                    {
                        loader: 'postcss-loader', //postcss插件 自动补全浏览器前缀
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.less$/, //处理less 文件
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: 'postcss-loader', //postcss插件 自动补全浏览器前缀 postcss 必须放在css-loader 和less-loader之间
                    options: {
                        ident: 'postcss',
                        plugins: [
                            require('autoprefixer')()
                        ]
                    }
                },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name : 'assets/[name]-[hash:5].[ext]', //将文件打包到指定的位置
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit : 20000,
                            name : 'assets/[name]-[hash:5].[ext]', //将文件打包到指定的位置
                        }
                    },
                    {
                        loader: 'image-webpack-loader', //压缩图片大小
                        options: {
                            bypassOnDebug: true,
                        }
                    }
                ]
            }

        ]
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
            filename: 'index-demo.html',
            //指定模板文件
            template: 'index.html',
            //指定JS输出在那个标签里面
            inject: 'body'
        })
    ]

}

//如果图片地址是相对地址 通过 ${ require('url') }引入