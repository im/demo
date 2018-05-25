var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {


    entry: './src/app.js',

    //打包后输出配置
    output: {
        //输出路径
        path: path.resolve(__dirname, './dist'),
        // publicPath : '../dist/',
        filename: 'js/[name].bundle.js'
    },
    /*
    * loader
    *
    * */
    module: {
        rules: [


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
                            //生成css雪碧图
                            require('postcss-sprites')({
                                //雪碧图生成地址
                                spritePath: 'dist/assets/sprites',
                                retina: true
                            }),
                            //补全浏览器前缀
                            require('autoprefixer')()
                        ]
                    }
                },
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }]
            },
            {
                test :/\.(eot|woff2?|ttf|svg)$/,
                use : {
                    loader :'url-loader',
                    options :{
                        name : 'assets/font/[name]-[hash:5].[ext]',
                        limit:5000
                    }
                }
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
            filename: 'index.html',
            //指定模板文件
            template: 'index.html',
            //指定JS输出在那个标签里面
            inject: 'body'
        })
    ]

}