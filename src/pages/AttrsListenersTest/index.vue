<template>
  <div>
      <h2>自定义带Hover提示的按钮</h2>
      <!-- 对el-button进行二次封装 -->
      <HintButton type="success"  icon="el-icon-delete" size="mini"  title="提示按钮" @click="handler" />
  
  </div>
</template>

<script>
import HintButton from './HintButton';
export default {
    name:'AttrsListenersTest',
    methods: {
        handler(){
            alert(666);
        }
    },
    components:{
        HintButton,
    }

}
</script>

<style>

</style>