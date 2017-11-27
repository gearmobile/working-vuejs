<template lang="pug">

  v-card.mb-4( color="teal lighten-3" )
    v-card-text
      
      component-opening( v-for="(component, index) in components", :key="index", :id="index" )
      
      v-flex.text-xs-right( xs12, tag="section" )
        v-btn( color="teal lighten-2", dark, @click.native="onClick()", :disabled="!openingFields" )
          | добавить проем

</template>

<script>
  import Opening from './Opening.vue'

  export default {
    name: 'OpeningWrapper',
    components: {
      ComponentOpening: Opening
    },
    methods: {
      onClick () {
        this.$store.dispatch('addComponent')
      }
    },
    computed: {
      components () {
        return this.$store.getters.getOpening
      },
      openingFields () {
        return this.$store.getters.checkFieldsOpening
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

