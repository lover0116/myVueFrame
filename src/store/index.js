import Vue from 'vue';
import Vuex from 'vuex';
import xz from './modules/xz';

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    xz
  },
  state: {
    aa: 2
  },
  getters: {},
  mutations: {
  },
  actions:{
  }
});

export default store
