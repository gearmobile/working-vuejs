import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Start.vue'
import MeetupList from '@/components/Meetup/MeetupList.vue'
import MeetupNew from '@/components/Meetup/MeetupNew.vue'
import MeetupDetails from '@/components/Meetup/MeetupDetails.vue'
import SignUp from '@/components/User/SignUp.vue'
import SignIn from '@/components/User/SignIn.vue'
import Profile from '@/components/User/Profile.vue'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetuplist',
      name: 'MeetupList',
      component: MeetupList
    },
    {
      path: '/meetupnew',
      name: 'MeetupNew',
      component: MeetupNew,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetupdetails/:id',
      name: 'MeetupDetails',
      props: true,
      component: MeetupDetails
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ]
})
