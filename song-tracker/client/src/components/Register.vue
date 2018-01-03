<template>
  <div class="register">
    <h2>register</h2>
    <form action="#">
      <input type="email" name="email" id="email" placeholder="email" v-model="email">
      <input type="password" name="password" id="password" v-model="password">
      <button type="button" @click="onRegister()">register</button>
    </form>
  </div>
</template>

<script>
  import AuthenticationService from '@/services/AuthenticationService'
  export default {
    name: 'Register',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      onRegister () {
        const response = AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        console.log(response.data)
      }
    }
  }
</script>

<style scoped>
  /**/
</style>
