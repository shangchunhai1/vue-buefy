const getters = {
  token: state => (state.user.token.length > 5 ? state.user.token : false),
  image: state => state.user.image,
  name: state => state.user.name,
  wx_remind: state => state.user.wx_remind,
  user_id: state => state.user.user_id,
  mobile_id: state => state.user.mobile_id,
  is_member: state => state.user.is_member,
  login_status: state => state.user.login_status,
  login_type: state => state.user.login_type,
  allowBack: state => state.user.allowBack,
  group: state => state.user.group,
  confirmAddress: state => state.user.confirmAddress,
  confirmAddress_status: state => state.user.confirmAddress_status,
  level: state => state.user.level,
  client_type: state => state.user.client_type,
  weibo_id: state => state.user.weibo_id,
  wechat_id: state => state.user.wechat_id,
  message_isread: state => state.message.message_isread, // 未读物流消息
  note_isread: state => state.message.note_isread, // 未读通知消息
  openid: state => state.user.openid,
  beforeLoginUrl: state => state.user.beforeLoginUrl,
  show_msg: state => state.user.show_msg,
  audio_src: state => state.user.audio_src,
  is_follow: state => state.user.is_follow,
};
export default getters;
