import axios from 'axios'

export const apiGetExample = ()=>{
  return axios.get('/mock/list');
}

export const apiPostExample = ()=>{
  return axios.post('/mock/add');
}

