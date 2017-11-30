<template lang="pug">

  v-card.mb-4( color="teal lighten-3" )
    v-card-text
      
      component-opening( v-for="(component, index) in components", :key="index", :id="index" )
      
      v-flex.text-xs-right( xs12, tag="section" )
        v-btn( color="teal lighten-2", dark, @click.native="onClick()", :disabled="!openingFields || checkArea || checkCommon" )
          | добавить проем

</template>

<script>
  import Opening from './Opening.vue'
  import { mapGetters } from 'vuex'

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
      ...mapGetters({
        components: 'getOpening',
        openingFields: 'checkFieldsOpening',
        checkArea: 'checkAreaCommonAndAreaOpening',
        checkCommon: 'checkCommonLess'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

