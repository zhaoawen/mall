// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
// 使用插件
Vue.use(VueRouter);

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call与apply的区别：
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}

// 配置路由
let router = new VueRouter({
    // 配置路由
    routes:routes,
    // 滚动行为
    scrollBehavior(to,from,savedPosition){
        // 代表滚动条在最上方
        return {y:0};
    }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行函数 next（path）放行到指定路由
    // 用户登录了，才会有token，未登录一定不会有
    // next();
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if(token){
        if(to.path=='/login'||to.path=='/register'){
            next('/home');
        }else{
            if(name){
                next();
            }else{
                // 如果没有用户信息，派发action让仓库存储用户信息再跳转
                // 带着token去问服务器要信息在首页展示
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息
                    // 清除token
                    await store.dispatch('userLogout');
                    next('./login');
                }
            }
        }
    }else{
        // 未登录不能去交易相关、支付相关、个人中心
        let topath = to.path;
        if(topath.indexOf('/trade')!=-1 || topath.indexOf('/pay')!=-1 || topath.indexOf('/center')!=-1){
            // 把未登录时想去的地方存储在地址栏中了
            next('/login?redirect='+topath);
        }else{
            next();
        }
    } 
});


export default router;