<template lang="pug">
  v-container
    v-layout( row )
      v-flex( xs12 )
        v-toolbar
          v-toolbar-title
            | Crypto Coins
          v-spacer
          v-toolbar-side-icon.hidden-md-and-up
          v-toolbar-items.hidden-sm-and-down
            v-btn( flat, to="/" )
              | home
            v-btn( flat, to="/list" )
              | list of icons
</template>

<script>
  export default {
    name: 'Navigation'
  }
</script>

<style lang="scss" scoped>
  //
</style>

