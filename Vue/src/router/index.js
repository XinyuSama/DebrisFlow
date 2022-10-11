import Vue from 'vue'
import VueRouter from 'vue-router'

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

export default router
