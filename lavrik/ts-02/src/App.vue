<template>
  <div id="app">
    <!--  -->
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        // msg: 'Welcome to Your Vue.js App'
      }
    },
    beforeCreate () {
      console.log(`before create hook`)
    },
    created () {
      console.log(`created hook`)
    },
    beforeMount () {
      console.log(`before mount hook`)
    },
    mounted () {
      console.log(`mounted hook`)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
