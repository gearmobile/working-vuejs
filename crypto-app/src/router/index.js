import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/HomePage.vue'
import List from '../pages/ListPage.vue'
import Coin from '../pages/CoinPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/HomePage')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/pages/ListPage')
  },
  {
    path: '/list/:id',
    name: 'Coin',
    component: () => import('@/pages/CoinPage'),
    props: true
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
