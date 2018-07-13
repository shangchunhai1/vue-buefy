/**
 * user_id 用户ID
 * session_key
 * is_member  0游客 1:会员
 */
export function getCookie(name) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${name}=`);// 获取字符串的起点
    if (cStart !== -1) {
      cStart = cStart + name.length + 1;// 获取值的起点
      let cEnd = document.cookie.indexOf(';', cStart);// 获取结尾处
      if (cEnd === -1) cEnd = document.cookie.length;// 如果是最后一个，结尾就是cookie字符串的结尾
      return decodeURI(document.cookie.substring(cStart, cEnd));// 截取字符串返回
    }
  }
  return '';
}

// 设置cookie   name为cookie的名字，value是值，expiredays为过期时间（天数）
export function setCookie(name, value, expiredays = 7) {
  console.log('setCookie');
  console.log(name);
  console.log(value);
  console.log(escape(value));
  const exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = `${name}=${escape(value)};expires=${exdate.toGMTString()}`;
}

// 删除cookie

export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
  }
}
export default {
  delCookie,
  setCookie,
  getCookie,
};
