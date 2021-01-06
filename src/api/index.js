import $axios from '@/axios/index'

export const apiGetMenuTree = ()=>{
  return $axios.get('/menu/tree')
}
//
export const apiGetSysDynamic = (params)=>{
  return $axios.get('/rest/SysDynamicField/list', {params});
}
export const apiPostSysDynamic = (params, type="post")=>{
  return $axios[type]('/rest/SysDynamicField', params);
}


