import {
  getCookie,
  setCookie,
} from '../../utils/cookie';

const user = {
  state: {
    user_id: '', // 店铺ID
    name: '', // 店铺名称
    image: '', // 店铺头像
    level: 0, // 店铺等级
    token: getCookie('token'), //
    login_status: false, // 是否登录
    login_type: '', // 登录类型
    allowBack: false, // 是否允许后退
    beforeLoginUrl: './', // 登录前链接
    group: 1, // 用户所在组
    mobile_id: '', // 登录账号
    client_type: '', // 客户端类型
    wechat_id: '', // 微信openID
    isLoading: false,
    show_msg: false, // 显示账单提示信息
    receive_award: 100, // 收款金额
    audio_src: '', // 收款语音播报地址
    is_follow: 0, // 是否关注了公众号
  },
  mutations: {
    SET_ISLOADING(state, status) {
      console.log(state.isLoading);
      const mystate = state;
      mystate.isLoading = status;
      console.log(state.isLoading);
    },
    SET_CLIENT_TYPE(state, clientType) {
      const mystate = state;
      mystate.client_type = clientType;
    },
    SET_ALLOW_BACK(state, status) {
      const mystate = state;
      mystate.allowBack = status;
    },
    SET_BEFORELOGINURL(state, url) {
      const mystate = state;
      mystate.beforeLoginUrl = url;
    },
    SET_USER_ID(state, userId) {
      const mystate = state;
      mystate.user_id = userId;
    },
    SET_IMAGE(state, image) {
      const mystate = state;
      mystate.image = image;
    },
    SET_TOKEN(state, token) {
      const mystate = state;
      mystate.token = token;
    },
    SET_NAME(state, name) {
      const mystate = state;
      mystate.name = name;
    },
  },

  actions: {
    setClientType({
      commit,
    }, clientType) {
      commit('SET_CLIENT_TYPE', clientType);
    },
    setAllowback({
      commit,
    }, status) {
      commit('SET_ALLOW_BACK', status);
    },
    setIsLoading({
      commit,
    }, status) {
      commit('SET_ISLOADING', status);
    },
    setbeforeLoginUrl({
      commit,
    }, url) {
      commit('SET_BEFORELOGINURL', url);
    },
    // 获取用户信息
    setUserData({
      commit,
    }, data) {
      console.log(data);
      commit('SET_USER_ID', data.msg.user_id);
      commit('SET_NAME', data.msg.nickname);
      commit('SET_IMAGE', data.msg.image);
      commit('SET_TOKEN', data.msg.token);
      setCookie('token', data.msg.token);
    },
  },
};

export default user;
