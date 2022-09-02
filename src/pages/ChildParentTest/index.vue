<template>
  <div>
      <h2>baba有存款:{{money}}</h2>
      <button @click="bfromxm(100)">找小明借100</button>
      <button @click="bfromxh(150)">找小红借150</button>
      <button @click="ball(200)">找所有孩子借200</button>
      <br/>
      <!-- ref可以获取节点（组件标签） -->
      <Son ref="xm" />
      <br/>
      <Daughter ref="xh" />

  </div>
</template>

<script>
import Son from './Son.vue';
import Daughter from './Daughter.vue';
export default {
    name:'ChildParentTest',
    data() {
        return {
            money:1000,
        }
    },
    components:{
        Son,
        Daughter
    },
    methods: {
        bfromxm(money){
            this.money+=money;
            this.$refs.xm.money-=money;
        },
        bfromxh(money){
            this.money+=money;
            this.$refs.xh.money-=money;
        },
        ball(money){
            this.money+=2*money;
            // 组件实例自身拥有一个属性$children,可以获取到当前组件的全部子组件
            this.$children.forEach(item => {
                item.money -= money;
            });
        }
    },

}
</script>

<style>

</style>