import {
  requestPost,
  requestPostFile,
  getParame,
} from './api';
import store from '../store';

/**
 * 获取登录信息
 */
export function mobileLogin(phone, password) {
  const parame = getParame;
  parame.api_name = 'get_user_mobile';
  parame.mobile_id = phone;
  parame.mobile_password = password;
  return requestPost('wechat/user/getdata&api=login', parame);
}

/**
 * 获取登录信息
 */
export const getUserInfo = async () => {
  const parame = getParame;
  return requestPost('shopapi/store/getdata?api=get_user_info', parame);
};
/**
 * 获取首页数据
 */
export function getHomeData() {
  const parame = getParame;
  return requestPost('shopapi/store/getdata?api=get_home_data', parame);
}
/**
 * 获取店铺商品列表
 */
export function getStoreProductDataList() {
  const parame = getParame;
  return requestPost('shopapi/store/getdata?api=get_product_data', parame);
}

export function getStoreProductDataByCategoryId(category_id) {
  const parame = getParame;
  parame.category_id = category_id;
  return requestPost('shopapi/store/getdata?api=get_product_by_categroy', parame);
}
export function getShopList() {
  const parame = getParame;
  return requestPost('shopapi/store/getdata?api=get_shop_list_data', parame);
}
export function getContactList() {
  const parame = getParame;
  return requestPost('shopapi/store/getdata?api=get_contact_list', parame);
}

/**
 * 修改店铺数据
 * @param {*} client_id
 */
export function updateStoreData(parame) {
  const defauleParame = getParame;
  parame.append('api_name', 'apiUpdateStoreData'); // 添加form表单中其他数据
  parame.append('store_id', defauleParame.store_id); // 添加form表单中其他数据
  parame.append('session_key', defauleParame.session_key); // 添加form表单中其他数据
  return requestPostFile('shopapi/store/getdata', parame);
}
