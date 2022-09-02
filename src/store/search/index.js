import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    // 仓库初始状态
    searchList: {},
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
    // 获取search数据
    async getSearchList({commit},params={}){
        // reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个空对象
        // params形参：是当用户派发action的时候传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params);
        if(result.code == 200){
            commit("GETSEARCHLIST",result.data);
        }
    }
};
// 为了简化仓库中的数据而生
// 可以把我们将来在组件当中需要用的数据简化一下，将来组件捞的时候就方便一点
const getters = {
    // 当前形参state是当前仓库里的state，不是大仓库里的哪个state
    goodsList(state){
        // 如果服务器数据回来了，返回的是一个数组
        // 假如网络不给力，会返回一个空数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}
