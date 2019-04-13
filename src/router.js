import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from '@/layouts/main'
import InitLayout from '@/layouts/init'

import HomeRouter from '@/modules/home/router'
import UserRouter from '@/modules/user/router'
import EventRouter from '@/modules/event/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '',
    component: InitLayout,
    children: [
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
