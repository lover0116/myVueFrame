import axios from 'axios'
import  Vue from 'vue'
const $msg = Vue.prototype.$message;

axios.interceptors.response.use(function (res) {
  if(res.data.success===false){
    $msg.info(res.data.message||"null");
  }
  return res
}, function (err) {
  $msg.info(err.response.data.message);
  return Promise.reject(err)
})

export default axios
