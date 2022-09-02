import { reqGoodsInfo , reqAddOrUpdateShopCart } from "@/api";
// 封装游客临时身份模块--uuid 生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token';

const state = {
    goodInfo : {},
    // 游客的临时身份
    uuid_token:getUUID(),
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    },
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit("GETGOODINFO",result.data);
        }
    },
    // 将产品添加到购物车中、修改某一个产品的个数
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的结果
        // 因为服务器并没有返回其余的数据，因此咱们不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 当前的函数返回一个promise
        if(result.code == 200){
            // 服务器成功，返回非空字符串即可
            return "ok"
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {
    // 路径导航简化的数据
    categoryView(state){
        // 至少返回一个空对象
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}
