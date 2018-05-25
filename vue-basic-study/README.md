# vue 基础学习

#### 实列 vue 

* 参数使用注意事项：
    * el
        * 可以接收元素对象
        * 也可以接收字符串类型的选择器
        * 注意： 不要把body html 作为容器使用 
    * template 
        * template 生成的内容会覆盖 el元素   
        * 该选项可以省略，省略后会使用容器的innerHTML内容作为模板内容
        
```javascript
new Vue({
    
    el : '#app', // 给vue指定 容器
    
    template : '<h1>hello world</h1>', //指定模板（内容）
    
    data :{ }, //存放vue中需要使用到的数据
})
```

#### 指令
根据不同的需求和结果进行结构渲染
* 指令使用在标签上，以标签自定义属性的形式存在: <div 指令></div>
* 指令都以v-为前缀，指令包含了vue内置指令和自定义指令
* 指令的基本形式： <div v-指令名称="表达式"></div>
* 指令会根据其表达式的值对当前指令所在的标签产生影响，不同的指令处理的结果会不同

##### 指令分类

| 指令名称 |作用 | 使用方法     |
| ---- | ---- | ---- |
|  v-model    |  数据绑定    |  格式  v-for="字段名 in(of) 数组json"    |
|  v-for  |  循环    |  v-for="字段名 in(of) 数组json"    |
| v-show | 显示 隐藏|     传递的值为布尔值  true  false |
| v-if | 显示与隐藏 |    和v-show对比的区别 就是是否删除dom节点   默认值为false|
| v-else-if | 必须和v-if连用||
| v-else | 必须和v-if连用  不能单独使用  否则报错   模板编译错误||
| v-bind | 动态绑定|  作用： 及时对页面的数据进行更改 v-bind:id="name" |
| v-on | 绑定事件|  函数必须写在methods里面 @click  快捷方法|
| v-text | 解析文本||
| v-bind:class | 绑定calss |1、对象型  '{red:isred}'   2、三目型   'isred?"red":"blue"'                                 3、数组型  '[{red:"isred"},{blue:"isblue"}]'|
| v-once | 进入页面时  只渲染一次 不再进行渲染, 数据修改也不会渲染 ||
| v-cloak | 防止闪烁 ||
| v-pre | 把标签内部的元素原位输出 ||

#### 数据处理
* watch 监控数据变化
    ```javascript
          watch :{
                isCheckedAll(){
                    this.cities.forEach(item => {
                        item.checked = this.isCheckedAll;
                    })
                }
            }
    ```
* computed  计算属性
    ```javascript
    computed : {
        checkedTotal : {
            get (){
                return this.cities.filter(item => item.checked).length
            }
        }
    }
    ```
#### 组件 component
创建：
```javascript
Vue.component('tab',{
    template :`<div class="box" id="app">
                    <div class="tab">
                        <ul class="clear">
                            <li class="active">北京</li>
                            <li>上海</li>
                            <li>广州</li>
                            <li>深圳</li>
                            <li>武汉</li>
                        </ul>
                        <div class="content">
                            <p> 这是内容</p>
                        </div>
                    </div>
                </div>`
})
```
调用：
```html
<tab></tab>
```



    




