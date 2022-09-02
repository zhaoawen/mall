export default [
    {
        path:"/test",
        component:()=>import("@/pages/ScopeSlotTest/ScopeSlotTest"),
        meta:{show:true},
    },
    {
        path:"/center",
        component:()=>import("@/pages/Center"),
        meta:{show:true},
        // 二级路由
        children:[
            {
                path:'myorder',
                component:()=>import("@/pages/Center/myOrder"),
            },
            {
                path:'grouporder',
                component:()=>import("@/pages/Center/groupOrder"),
            },
            {
                path:'/center',
                redirect:'/center/myorder',
            },
        ]
    },
    {
        path:"/paysuccess",
        component:()=>import("@/pages/PaySuccess"),
        meta:{show:true},
    },
    {
        path:"/pay",
        component:()=>import("@/pages/Pay"),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path == '/trade'){
                next();
            }else{
                next('/home');
            }
        }
    },
    {
        path:"/trade",
        component:()=>import("@/pages/Trade"),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:"/shopcart",
        component:()=>import("@/pages/ShopCart"),
        meta:{show:true},
    },
    {
        path:"/addcartaucess",
        component:()=>import("@/pages/AddCartSuccess"),
        name:"addcartaucess",
        meta:{show:true},
    },
    {
        path:"/home",
        component:()=>import("@/pages/Home"),
        meta:{show:true},
    },
    {
        path:"/search/:keyword?",
        component:()=>import("@/pages/Search"),
        meta:{show:true},
        name:"search",
        // props可以作为路由身上的属性，
        // 布尔值写法true只能传递params属性
        // props:true,
        // 对象写法
        // props:{a:1,b:2},
        // 函数写法
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:"/login",
        component:()=>import("@/pages/Login"),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import("@/pages/Register"),
        meta:{show:false}
    },
    // 重定向，在项目跑起来的时候，访问/,立马让它定向到首页
    {
        path:"*",
        redirect:"/home"
    },
    {
        path:"/detail/:skuid",
        component:()=>import("@/pages/Detail"),
        meta:{show:true}
    },
]