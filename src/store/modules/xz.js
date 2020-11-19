export default {
  state: {
    count: 1,
    list: [
      { "name": 'a' },
      { "name": 'b' },
    ]
  },
  getters: {
    nameA(state){
      return state.list.filter(i=>{
        return i.name === 'b'
      })
    }
  },
  mutations: {
    upCount(state, data){
      state.count = data;
    }
  },
  actions: {
    upCount({commit, state}){
      let n = state.count + 1;
      commit('upCount', n);
    }
  }
}
