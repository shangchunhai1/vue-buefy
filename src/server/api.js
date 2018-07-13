/**
 * Created by mwuyz on 2016/10/28.
 */
import qs from 'querystring';
import axios from 'axios';
import store from '../store';
/**
 * 公共参数
 */
export const getParameForStore = {
  session_key: 1,
  user_id: 2,
  store_id: 3,
  client_type: 4,
};
/**
 * 公共参数
 */
export const getParame = {
  session_key: 1,
  store_id: 2,
  client_type: 3,
  user_id: 2,
};
const hostUrl = `${process.env.VUE_APP_BSAE_URL}/index.php?route=`; // 公共rul
/**
 * post请求
 * @param {*} postPrl
 * @param {*} postData
 */
export const requestPost = async (postPrl, postData) => {
  store.dispatch('setIsLoading', true);
  return axios({
    method: 'post',
    url: `${hostUrl}${postPrl}`,
    data: qs.stringify(postData),
  });
};
/**
 * form-data  post
 * @param {*} postPrl
 * @param {*} postData
 */
export const requestPostFile = async (postPrl, postData) => {
  store.dispatch('setIsLoading', true);
  return axios({
    method: 'post',
    url: `${hostUrl}${postPrl}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: postData,
  });
};

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  store.dispatch('setIsLoading', false);
  const {
    data: resposntData,
  } = response;
  console.log('响应拦截');
  console.log(resposntData);
  return resposntData;
  // 根据返回的code值来做不同的处理（和后端约定）
  // switch (resposntData.code) {
  //   case '0':
  //     // 举例
  //     // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
  //     if (isIOS()) {
  //       // 异步以保证数据已渲染到页面上
  //       setTimeout(() => {
  //         // 通过滚动强制浏览器进行页面重绘
  //         document.body.scrollTop += 1;
  //       }, 0);
  //     }
  //     // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
  //     return data;

  //   // 需要重新登录
  //   case 'SHIRO_E5001':
  //     // 微信生产环境下授权登录
  //     if (isWeChat() && IS_PRODUCTION) {
  //       axios.get(apis.common.wechat.authorizeUrl).then(({ result }) => {
  //         location.replace(global.decodeURIComponent(result));
  //       });
  //     } else {
  //       // 否则跳转到h5登录并带上跳转路由
  //       const search = encodeSearchParams({
  //         next: window.location.href,
  //       });
  //       window.location.replace(`/user/login?${search}`);
  //     }

  //     // 不显示提示消息
  //     data.description = '';
  //     break;

  //   default:
  // }
  // 若不是正确的返回code，且已经登录，就抛出错误
  // const err = new Error(resposntData.description);

  // err.data = resposntData;
  // err.response = response;

  // throw err;
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    const errRes = err;
    switch (err.response.status) {
      case 400:
        errRes.message = '请求错误';
        break;

      case 401:
        errRes.message = '未授权，请登录';
        break;

      case 403:
        errRes.message = '拒绝访问';
        break;

      case 404:
        errRes.message = `请求地址出错: ${err.response.config.url}`;
        break;

      case 408:
        errRes.message = '请求超时';
        break;

      case 500:
        errRes.message = '服务器内部错误';
        break;

      case 501:
        errRes.message = '服务未实现';
        break;

      case 502:
        errRes.message = '网关错误';
        break;

      case 503:
        errRes.message = '服务不可用';
        break;

      case 504:
        errRes.message = '网关超时';
        break;

      case 505:
        errRes.message = 'HTTP版本不受支持';
        break;

      default:
    }
  }

  return Promise.reject(err);
});


// // 请求拦截器
// axios.interceptors.request.use.then((config) => {
//   console.log(config);
//   return config;
// })
//   .catch(error => Promise.reject(error));
