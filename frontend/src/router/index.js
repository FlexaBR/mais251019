import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: 'Analise',
        path: 'analise',
        component: () => import('@/views/pages/Analise')
      },
      {
        name: 'Error',
        path: 'error',
        component: () => import('@/views/pages/Error')
      },
      {
        name: 'Home',
        path: 'home',
        component: () => import('@/views/pages/Home')
      },
      {
        name: 'Login',
        path: 'login',
        component: () => import('@/views/pages/Login')
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('@/views/pages/Register')
      }
    ]
  },

  {
    path: '/dashboard',
    component: () => import('@/views/dashboard/Index'),
    children: [
      // Dashboard
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/dashboard/Dashboard')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: '404 Error',
        path: '',
        component: () => import('@/views/pages/Error')
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
