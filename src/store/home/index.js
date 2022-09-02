import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api";

// home模块的小仓库
const state = {
    // state中的初始值
    // 三级菜单的数据
    categoryList:[],
    // 轮播图的数据
    bannerList:[],
    // 获取楼层的数据
    floorList:[],
};
// 唯一修改state的地方
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    // 通过api里面的接口函数调用，向服务器发送请求，获取数据
    async categoryList({commit}){
        let result = await reqCategoryList();
        if(result.code==200){
            commit("CATEGORYLIST",result.data);
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({commit}){
        let result = await reqGetBannerList();
        if(result.code==200){
            commit("GETBANNERLIST",result.data);
        }
    },
    // 获取楼层的数据
    async getFloorList({commit}){
        let result = await reqFloorList();
        if(result.code==200){
            // 提交mutation
            commit("GETFLOORLIST",result.data);
        }
    }
};
// 计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
