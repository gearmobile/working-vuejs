<template lang="pug">
  
  v-app( light)
    
    // SECTION MASONRY
    component-masonry

    // SECTION SEAM
    component-seam

    // SECTION BRICK
    component-brick
  
    // SECTION BUILDING
    component-building

    // SECTION OPENING
    v-container
      v-layout( row, wrap )
        v-flex.mb-4( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Добавить оконные и дверные проемы
      v-layout( row, wrap )
        v-flex.mb-4( xs12, md8, offset-md2 )
          component-opening( v-for="(component, index) in components", :key="index", :id="index" )
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-btn.primary( @click="onClick()" )
            | добавить проем
    
    // SECTION OUTPUT
    component-output

</template>

<script>
  
  import { mapGetters } from 'vuex'
  
  import Masonry from './components/Masonry.vue'
  import Seam from './components/Seam.vue'
  import Brick from './components/Brick.vue'
  import Building from './components/Building.vue'
  import Opening from './components/Opening.vue'
  import Output from './components/Output.vue'

  export default {
    components: {
      componentMasonry: Masonry,
      componentSeam: Seam,
      componentBrick: Brick,
      componentBuilding: Building,
      componentOpening: Opening,
      componentOutput: Output
    },
    methods: {
      onClick () {
        this.$store.dispatch('addComponent')
      }
    },
    computed: {
      ...mapGetters({
        mask: 'getMask',
        components: 'getOpening',
        maskCounter: 'getMaskCounter'
      })
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
