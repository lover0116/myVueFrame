import axios from 'axios'
import {Message} from 'element-ui'
const baseUrl = window.ContextPath === undefined ? "https://weixin.billjc.com/ems" : window.ContextPath;
axios.interceptors.request.use(config=> {
  config.baseURL = baseUrl;
  config.withCredentials = true;
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({message: data.data.msg});
    return;
  }else if(typeof data.data === 'string'&&data.headers['content-type']==='text/html;charset=UTF-8'){
    Message.error({ message: "请登录！" });
    //window.location.href = "/#/Login?redirect="+window.location.hash.substr(2);
    return ;
  }
  return data;
}, err=> {
  /*console.log("err.response", err.response);
  if (err.response.status === 504||err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!'});
  }else {
    Message.error({message: '未知错误!'});
  }*/
  Message.error({message: err.response&&err.response.data.message});
  return Promise.resolve(err);
})
export default axios
