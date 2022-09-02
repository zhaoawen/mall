<template>
  <div>
      <!-- 可以巧妙利用a标签实现按钮带有提示功能 -->
    <a :title="title">
        <!-- 下面这种写法，v-bind一定不能用冒号 v-on一定不能用@替换 -->
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>

<script>
export default {
    name:'HintButton',

}
</script>

<style>

</style>