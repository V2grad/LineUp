import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import MainLayout from '@/layouts/main'
import InitLayout from '@/layouts/init'

import HomeRouter from '@/modules/home/router'
import AuthRouter from '@/modules/auth/router'
import DashBoardRouter from '@/modules/dashboard/router'
import UserRouter from '@/modules/user/router'
import EventRouter from '@/modules/event/router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '',
    component: InitLayout,
    children: [
      ...AuthRouter,
      ...HomeRouter,
      // Trival
      {
        path: '/404',
        name: 'WIP',
        component: () => import(/* webpackChunkName: "WIP" */ '@/views/WIP')
      }
    ]
  }, {
    path: '',
    component: MainLayout,
    children: [
      ...DashBoardRouter,
      ...UserRouter,
      ...EventRouter
    ]
  },
  { // Fallback
    path: '',
    component: InitLayout,
    children: [{
      path: '*',
      component: () => import(/* webpackChunkName: "WIP" */ '@/views/WIP')
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        name: 'Signin'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
