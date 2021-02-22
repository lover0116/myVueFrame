import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Layout = () => import(/* webpackChunkName: "view" */ '../components/Layout/Layout')
const Welcome = () => import(/* webpackChunkName: "view" */ '../components/Welcome')
//Temp 增删改模板页
const Temp = () => import(/* webpackChunkName: "view" */ '../views/Temp/XTemplate')

let routers = [
  {
    path: '/',
    name: 'Home',
    redirect: '/Welcome',
    component: Layout,
    children: [
      {
        path: 'Welcome',
        name: 'Welcome',
        component: Welcome,
        meta: { title: "Welcome" },
      },
      {
        path: 'Temp',
        name: 'Temp',
        component: Temp,
        meta: { title: "Temp" },
      },
    ]
  }
];
export default new Router({
  routes: routers
})
