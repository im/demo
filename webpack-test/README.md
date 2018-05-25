# webpack 基础学习笔记



### webpack介绍

* 为JS准备的打包工具

* 可以将很多模块打包成静态文件

* 代码分割

  [webpack官网地址](https://webpack.js.org/)

  [npm官网地址](https://www.npmjs.com/)

  [babel官网地址](http://babeljs.io/)

> 命令行执行` webpack` 命令是 `webpac`k 会去找项目中 `webpack.config.js`配置文件，也可以使用 --config 命令来指定其他的配置文件

```bash
webpack --config webpack.config.dev.js
```

### webpack 配置文件介绍

##### entry
 
指定项目打包是从哪个文件开始 , 配置文件中`entry`接受三种形式的值：字符串，数组和对象

字符串 ：  （单独一个文件打包）

```javascript
entry : './src/script/main.js'
```

数组： （将两个没有依赖，不相关的文件打包到一起）

```javascript
entry :['./src/script/a.js','./src/script/b.js']
```

对象 ： （方便应用到多页面 输出不同的多个文件）

```javascript
entry :{
        page1: './src/script/main.js',
        page2: ['./src/script/a.js', './src/script/b.js'],
        page3: ['./src/script/c.js', './src/script/d.js'],
    }
```

##### output {}

打包后输出配置

```javascript
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
}
```

##### plugins {}

webpack 插件

* htmlWebpackPlugin ( 生成html 关联JS文件 ）

```javascript
var htmlWebpackPlugin = require('html-webpack-plugin')
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
```

##### module {}

* rules [] （配置一些webpack loader ）

  * babel-loader  ( 将新的JS语法转换成兼容的js )

    安装：

    ```bash
    npm install --save-dev babel-loader babel-core
    ```

    配置：

    ```javascript
    {
        test: /\.js$/, //匹配正则
        exclude: /node_modules/, // 排除不用编译的文件夹
        include: /src/, //指定需要编译的文件夹
        loader: "babel-loader"
    }
    ```

  * html-loader ( 处理html文件  将模板文件解析成字符串 )

    安装：

    ```bash
    npm install --save-dev html-loader
    ```

    配置：

    ```javascript
    {
        test: /\.html$/,
        loader: "html-loader"
    }
    ```


  * ejs-loader ( 将模板文件转换页面，返回的是一个函数，接受的参数能传递到模板文件里面使用 )

      安装：

      ```bash
      npm install --save-dev ejs-loader
      ```

      配置：

      ```javascript
      {
          test: /\.ejs$/,
              loader: "ejs-loader"
      }
      ```

  * css-loader ( 处理 css 文件 )

      注释： importLoaders=1

      importLoaders 如果css文件里面用import引入， 这个文件是不会经过css-loader后面的loader处理的，比如postcss, 如果想要处理import引入进来的文件 需要添加importLoaders importLoaders=1 表示cssloader 处理完之后再处理import进来的文件这个1表示 css-loader后边的第一个loader

      安装：

      ```bash
      npm install --save-dev css-loader style-loader postcss-loader
      ```

      配置：

      ```javascript
      {
          test: /\.css$/,
              use: [
                  'style-loader',
                  'css-loader?importLoaders=1',
                  {
                      loader: 'postcss-loader', //postcss 插件 自动补全浏览器前缀
                      options: {
                          ident: 'postcss',
                          plugins: [
                              require('autoprefixer')()
                          ]
                      }
                  }
              ]
      }
      ```

  * less-loader  ( 处理 less文件 )

      安装：

      ```javascript
      npm install --save-dev less-loader less
      ```

      配置：

      `注意:postcss插件 自动补全浏览器前缀 postcss 必须放在css-loader 和less-loader之间`

      ```javascript
      {
          test: /\.less$/, //处理less 文件···
              use: [{
                  loader: "style-loader"
              }, {
                  loader: "css-loader"
              }, {
                  loader: 'postcss-loader',
                  options: {
                      ident: 'postcss',
                      plugins: [
                          require('autoprefixer')()
                      ]
                  }
              }
      ```

  * url-loader ( 处理图片, 压缩图片)

      安装：

      ```bash
      npm install --save-dev url-loader image-webpack-loader
      ```

      配置：

      `注意 ：如果图片地址是相对地址 通过 ${ require('url') }引入`

      ```javascript
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
      ```

  ​

