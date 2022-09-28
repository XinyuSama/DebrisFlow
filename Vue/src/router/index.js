import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect:'/FiveDaysData',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    children:[
      {
        path:'/FiveDaysData',
      },
      {
        path:'/UserGroup',
      },
      {
        path:'/UserBuyCount',
      },
      {
        path:'/UserTypeAccountedFor',
      },
      {
        path:'/UserExpensePlace',
      },
      {
        path:'/UserExpenseTimes',
      },
      {
        path: "UserExpenseTimesAndPlace"
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
