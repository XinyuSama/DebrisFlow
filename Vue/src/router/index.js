import Vue from 'vue'
import VueRouter from 'vue-router'
// import vuex from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/tableData',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    children:[
      {
        path:'/tableData',
        component: () => import("../views/tableData")
      },
      {
        path:'/echartsTable',
        component: () => import("../views/echartsTable")
      },
      {
        path:'/unityModel',
        component: () => import("../views/unityModel")
      },
      {
        path:'/twoDModel',
        component: () => import("../views/twoDModel")
      },
      {
        path:'/intro',
        component: () => import("../views/intro")
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// //前置守卫
// router.beforeEach((to, from, next) => {
//   if(true){//这里写的假判断，一般在你的路由守卫中，什么时候调用next()，什么时候调用你的打开服务方法
//     vuex.commit('showLoading',true);
//     next()
//   }else{
//     next({
//       path: '/'
//     })
//   }
// })
// //后置钩子
// router.afterEach(() =>{
//   vuex.commit('showLoading',false)
// })
export default router
