import $axios from '@/axios/index'


export const apiGetSysRole = (params)=>{
  return $axios.get('/rest/SysRole/list', {params});
}
export const apiPostSysRole = (params, type="post")=>{
  return $axios[type]('/rest/SysRole', params);
}


