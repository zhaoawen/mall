import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入仓库
import store from './store';
// 三级联动组件--注册全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 注册全局组件
import { Button,MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
// elementUI全局注册
Vue.component(Button.name,Button);
// elementUI挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

// 引入MockServe.js---mock数据
import '@/mock/mockServe'
// 引入swiper的样式
import "swiper/css/swiper.css";
// 统一接收api文件夹里面全部的请求头函数
import * as API from '@/api';
import shidiqi from '@/assets/1.png';

// 引入插件
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad,{
  // 懒加载默认的图片
  loading:shidiqi
});

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';

Vue.use(myPlugins,{
  name:'upper',
});

// 引入表单验证插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route $router属性
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store,
}).$mount('#app')
