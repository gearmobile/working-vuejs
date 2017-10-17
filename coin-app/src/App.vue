<template lang="pug">

  // https://scotch.io/tutorials/getting-started-with-vue-router
  // http://beta.quasar-framework.org/components/lists-and-list-items.html
  
  #q-app
    
    q-tabs( slot="navigation" )
      q-route-tab( slot="title", to="/", replace, label="Home" )
      q-route-tab( slot="title", to="/about", replace, label="About" )
      q-route-tab( slot="title", to="/coins/bitcoin", replace, label="Coins" )
      q-route-tab( slot="title", to="/coins/ethereum", replace, label="Ethereum" )

    router-view

</template>

<script>
  import { QTabs, QRouteTab } from 'quasar'

  export default {
    components: {
      QTabs,
      QRouteTab
    }
  }
</script>

<style lang="stylus"></style>
