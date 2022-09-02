import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";

// shopcart模块的小仓库
const state = {
    // 仓库初始状态
    cartList:[],
};
const mutations = {
    GETCARTLIAT(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    // 获取购物车列表数据
    async getCartList ({commit}){
        let result = await reqCartList();
        if(result.code==200){
            commit("GETCARTLIAT",result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // context就是小仓库，小仓库里面有：
        // commit：提交mutations修改state
        // getters：计算属性
        // dispatch：派发action
        // state：当前仓库数据
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId):'';
            // 将每一次返回的Promise都添加到数组中
            PromiseAll.push(promise);
        });
        // 只要全部的promise成功，则返回成功；有一个失败，则返回失败
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
// 为了简化仓库中的数据而生
// 可以把我们将来在组件当中需要用的数据简化一下，将来组件捞的时候就方便一点
const getters = {
    cartList(state){
        return state.cartList[0]||{};
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}
