<template lang="pug">
  v-app( light )
    v-container( grid-list-md )
      v-layout( row, wrap )
        v-flex.mb-4( xs12 )
          component-navigation
        v-flex( xs12 )
          router-view
</template>

<script>
  import NavBar from './partials/Navigation.vue'

  export default {
    components: {
      ComponentNavigation: NavBar
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
