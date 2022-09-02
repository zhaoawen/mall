import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token';

// user模块的小仓库
const state = {
    // 仓库初始状态
    code:"",
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    // 把仓库中相关用户信息清空
    CLEAR(state){
        state.token='';
        state.userInfo={};
        // 把本地存储token清空
        removeToken();
    }
};
const actions = {
    // 获取验证码的接口，把验证码返回，但是正常情况下应该是后台把验证码发到用户手机上
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit("GETCODE",result.data);
            return "ok";
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code==200){
            return "ok";
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 登录（token）
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if(result.code==200){
            // 将来经常通过带着token找服务器要用户信息进行展示
            commit("USERLOGIN",result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        }else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code==200){
            // 用户已经登录成功且获取到token
            commit('GETUSERINFO',result.data);
            return "ok";
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogout();
        if(result.code==200){
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error('faile'));
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
