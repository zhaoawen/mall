<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!--  在Home、Search显示；在登录注册隐藏-->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default{
  name:'',
  data() {
    return {
      msg:'abc',
    }
  },
  components:{
    Header,
    Footer
  },
  mounted() {
    // 通知Vuex发送请求，获取三级列表数据，存储在仓库中
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
