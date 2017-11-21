import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/HomePage.vue'
import List from '../pages/ListPage.vue'
import Coin from '../pages/CoinPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: () => import('@/pages/HomePage'),
    name: 'Home',
  },
  {
    path: '/list',
    component: () => import('@/pages/ListPage'),
    name: 'List',
  },
  {
    path: '/list/:id',
    component: () => import('@/pages/CoinPage'),
    name: 'Coin',
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
