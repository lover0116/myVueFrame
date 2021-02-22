export default {
  state: {
    btnLoading: false,
  },
  getters: {
  },
  mutations: {
    upBtnLoading(state, data){
      state.btnLoading = data;
    }
  },
  actions: {
    upBtnLoading({commit}, data){
      commit('upBtnLoading', data);
    }
  }
}
