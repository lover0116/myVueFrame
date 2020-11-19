import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Layout = () => import(/* webpackChunkName: "group-foo" */ '../components/layout/Layout')
const Welcome = () => import(/* webpackChunkName: "group-foo" */ '../components/Home')
const Dialog = () => import(/* webpackChunkName: "group-foo" */ '../components/view/Dialog')

let routers = [
  {
    path: '',
    name: 'Home',
    redirect: '/welcome',
    component: Layout,
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: Welcome
      }
    ]
  },
  {
    path: '/',
    name: 'dialog',
    component: Layout,
    children: [
      {
        path: 'dialog',
        name: 'Dialog',
        component: Dialog
      }
    ]
  }
];
export default new Router({
  routes: routers
})
