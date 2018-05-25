Vue.component('pagination', {


    props : [
        'total', //总共的条数
        'prepage', //每次显示多少条
        'value', //当前选中的页码
    ],

    data (){
        return {
            //向上取整 一共有多少页
            pages : Math.ceil(this.total / this.prepage)
        }
    },
    methods : {

        change(p){

            this.$emit('input', p);
        }

    },

    template: `<div class="pagination">
                        <span class="total">共 {{total}} 条 / {{ pages }} 页</span>

                        <span class="prev disabled">&lt;</span>

                        <span class="page" v-for="p in pages" :class="{'active': p == value}" @click="change(p)">{{p}}</span>
                    

                        <span class="next">&gt;</span>

                        <span class="jump">
                            前往
                            <input type="text" />
                            页
                        </span>
                    </div>`
})