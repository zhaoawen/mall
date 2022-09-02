<template>
  <div style="background:#ccc;height:50px">
      <h3>女儿小红有存款{{money}}</h3>
        <button  @click="giveMoney(100)">给爸爸钱：100</button>
  </div>
</template>

<script>
import myMixin from '@/pages/ChildParentTest/myMixin/myMixin';
export default {
    name:'Son',
    mixins:[myMixin],
    data() {
        return {
            money:30000
        }
    },
}
</script>

<style>

</style>