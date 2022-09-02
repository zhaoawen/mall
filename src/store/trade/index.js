import { reqAddressInfo,reqOrderInfo } from "@/api";
// trade模块的小仓库
const state = {
    // 仓库初始状态
    addressInfo:[],
    orderInfo:{},
};
const mutations = {
    GETUSERADDRESS(state,addressInfo){
        state.addressInfo = addressInfo;
        // 修改默认地址为第一个
        addressInfo[0].isDefault=1;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    }
};
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        if(result.code==200){
            commit("GETUSERADDRESS",result.data);
        }
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code==200){
            commit("GETORDERINFO",result.data);
        }
    }
};
// 为了简化仓库中的数据而生
// 可以把我们将来在组件当中需要用的数据简化一下，将来组件捞的时候就方便一点
const getters = {
    
};
export default {
    state,
    mutations,
    actions,
    getters
}
