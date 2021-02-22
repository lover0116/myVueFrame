import Vue from 'vue'
import App from './App.vue'
import ELEMENT from 'element-ui'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/style.css';
import store from './store'

Vue.config.productionTip = false
Vue.use(ELEMENT)

/*引入过滤器*/
import * as filters from './filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.back = () => router.back(-1);
Vue.directive("back", {
  bind: (el)=>{
    el.addEventListener("click", ()=>{
      window.history.back();
    })
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
