import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
const baseUrl = window.ContextPath === undefined ? "" : window.ContextPath;
axios.interceptors.request.use(config=> {
  config.baseURL = baseUrl;
  config.withCredentials = true;
  store.dispatch("upBtnLoading", true);
  return config;
}, err=> {
  Message.error({message: '请求超时!'});
  return Promise.resolve(err);
})
axios.interceptors.response.use(data=> {
  console.log('response', data.config);
  if(typeof data.data === 'string'&&data.headers['content-type']==='text/html;charset=UTF-8'){
    Message.error({ message: "请登录！" });
  }else if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({message: data.data.message});
  }else if(data.config&&data.config.method !== 'get'){
    Message.success({message: data.data.message})
  }else{
    //
  }
  store.dispatch("upBtnLoading", false);
  return data.data;
}, err=> {
  Message.error({message: err.response&&err.response.data.message});
  store.dispatch("upBtnLoading", false);
  return Promise.resolve(err);
})
export default axios
