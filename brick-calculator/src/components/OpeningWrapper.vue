<template lang="pug">

  v-card.mb-4( color="teal lighten-3" )
    v-card-text
      
      h4.text-xs-center.text-md-left.title.white--text.mb-4
        | Добавить оконные и дверные проемы
      
      component-opening( v-for="(component, index) in components", :key="index", :id="index" )
      
      v-flex.text-xs-right( xs12, tag="section" )
        v-btn( color="teal lighten-2", dark, @click.native="onClick()" )
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

