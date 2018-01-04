import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'

export default [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]
