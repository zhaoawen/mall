// Vue插件一定会向外暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){
    // 全局指令
    // Vue.prototype.$bus :任何组件都可以使用
    // Vue.directive
    // Vue.component
    // Vue.filter
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML = params.value.toUpperCase();
        console.log(params);
    });
}

export default myPlugins;