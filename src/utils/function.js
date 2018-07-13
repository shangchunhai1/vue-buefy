/**
 * 验证手机号
 */
export function checkPhone(number) {
  console.log(number);
  const checkMobile = /^1(3|4|5|7|8)\d{9}$/;
  return checkMobile.test(number);
}
export default {
  checkPhone,
};
