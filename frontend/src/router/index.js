import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/logoff/Home.vue'

import Dashboard from '@/views/login/Dashboard'
import AdminPages from '@/components/admin/AdminPages'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        name: 'Home',
        path: 'home',
        component: Home
      }
    ]
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
