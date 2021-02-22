import Vue from 'vue';
import Vuex from 'vuex';
import base from './modules/base';

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    base
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
