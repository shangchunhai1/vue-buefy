/**
 * websocket  调用 createWebSocket()即可
 * */
import { bandClientId } from './request/store';
import store from '../store';

let ws;// websocket实例
let lockReconnect = false;// 避免重复连接
const wsUrl = process.env.WEBSCOKET_URL;

// 心跳检测
const heartCheck = {
  timeout: 20000, // 60秒
  timeoutObj: null,
  reset() {
    clearTimeout(this.timeoutObj);
    return this;
  },
  start() {
    this.timeoutObj = setTimeout(() => {
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      // onmessage拿到返回的心跳就说明连接正常
      ws.send('HeartBeat');
    }, this.timeout);
  },
};
export function createWebSocket() {
  try {
    ws = new WebSocket(wsUrl);
    this.initEventHandle();
  } catch (e) {
    this.reconnect(wsUrl);
  }
}

export function initEventHandle() {
  ws.onclose = () => {
    this.reconnect(wsUrl);
  };
  ws.onerror = () => {
    this.reconnect(wsUrl);
  };
  ws.onopen = () => {
    // 心跳检测重置
    heartCheck.reset().start();
  };
  ws.onmessage = (e) => {
    // 如果获取到消息，心跳检测重置
    // 拿到任何消息都说明当前连接是正常的
    heartCheck.reset().start();
    let data = e.data || '';
    try {
      data = this.evil(`(${data})`);
    } catch (exception) {
      data = '';
    }
    if (data) {
      // data = eval("(" + data + ")");
      let type = data.msg_type || '';
      if (!type) {
        type = data.type || '';
      }
      switch (type) {
        case 'bandid': // 绑定client_id
          bandClientId(data.client_id).then(() => {
            // //获取联系人列表
            // store.dispatch('getContactList')
          });
          break;
        case 'receive_award': // 收款提醒
          store.dispatch('receiveAward', data);
          // that.message_data.push(data);
          // that.setToBottom = true
          break;
        case 'reset_login':// 重新登录
          store.dispatch('resetUser');
          break;
        default:
      }
    }
  };
}
export function evil(fn) {
  const Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn(`return ${fn}`)();
}
export function reconnect(url) {
  if (lockReconnect) return;
  lockReconnect = true;
  // 没连接上会一直重连，设置延迟避免请求过多
  setTimeout(() => {
    createWebSocket(url);
    lockReconnect = false;
  }, 2000);
}


export default {
  createWebSocket,
};
