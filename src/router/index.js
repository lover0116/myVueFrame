import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Home = () => import(/* webpackChunkName: "group-foo" */ '../components/Home')

let routers = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
];
export default new Router({
  routes: routers
})
