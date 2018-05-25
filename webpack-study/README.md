# webpack 进阶学习

webpack 之父   Tobias Koppers （github : @sokra）



chunk  代码块的意思 

bundle 捆 打包后的意思  捆绑


##### webpack支持的打包方式

* js 模块引入方式

  ```javascript
  //es module

  //sum.js
  export default function (a,b){
      return a + b;
  }  

  //app.js
  import sum from './sum.js'

  ```

* cmd (  common.js )

  ```javascript
  //common

  //minus.js
  module.exports = function (a,b){
      return a - b;
  }

  //app.js
  var minus =  require('./minus');

  ```

* amd  (异步加载模块)

  ```javascript
  //muti.js
  define(function(require,factory){
      'use strict'
      return function (a,b){
          return a*b;
      }
  })

  //app.js
  require(['muti'],function(muti){
      muti(10,20);
  })

  ```

##### babel 

babel presets  指定了 babel 编译的语法， 那些语法需要编译 那些不需要编译

`babel只支持语法的编译，但是浏览器的一些方法函数还是得不到支持，需要借助插件才能完成`

babel polyfill 全局   为应用而准备的  会污染全局变量

babel runtime transform  局部  为开发框架而准备， 不会污染全局 .babelrc

##### tree shaking  ( 删除一些多余 没有用得方法  js css ) 

* 使用场景
  * 常规优化
  * 引入第三方库的某一个功能  （只使用其中的一个方法 确要打包整个库）

##### 图片处理

* css中引入的图片
  * file-loader
* 自动合并成雪碧图
  * postcss-sprites
* 压缩图片
  * img-loader
* base64编码
  * url-loader


##### 字体文件处理

* file-loader
* url-loader

##### 第三方JS库

* 场景
  * 第三方库在远程CDN上 
  * 放在项目中的第三方库  ， 很多地方用到 

* 处理方式

  * webpack.providePlugin

    将jquery注入到每一个模块当中

    ```javascript
     new webpack.ProvidePlugin({
         $ : 'jquery' //模块名  通过npm install jquery
     })
    ```

  * imports-loader

    ```javascript
    {
        test : path.resolve(__dirname,'src/app.js'),
            use:[{
                loader : 'imports-loader',
                options:{
                    $ : 'jquery'
                }
            }]
    }
    ```

  * window