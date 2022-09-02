// 统一管理API
import requests from "./request";
import mockRequest from './mockReauest';

// 三级联动的接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList  get 无参数
export const reqCategoryList = ()=>{
    // 发请求:返回的是Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get'});
}

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = ()=>mockRequest.get('/banner');

// 获取floor数据
export const reqFloorList = ()=>mockRequest.get('/floor');

// 获取搜素模块的数据  /api/list 请求方式：post 参数：需要
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
// 当前这个接口，给服务器传递参数的时候至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

// 获取产品详情的接口 /api/item/{skuId} 请求方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

// 将产品添加到购物车中（获取更新某一个产品的个数） /api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'}); 

// 获取购物车列表 /api/cart/cartList get
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});

// 删除某一个购物车里面的商品
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 修改商品的勾选状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
export const reqGetCode = (phone) =>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const reqUserRegister = (data)=>requests({url:`/user/passport/register`,method:'post',data});

// 登录
export const reqUserLogin = (data)=>requests({url:`/user/passport/login`,data,method:'post'});

// 获取用户的信息（需要带着用户的token）
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

// 退出登录
export const reqLogout = ()=>requests({url:`/user/passport/logout`,method:'get'});

// 获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单的接口
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 获取支付订单状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取我的订单列表
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});