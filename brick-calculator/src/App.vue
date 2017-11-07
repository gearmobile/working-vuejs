<template lang="pug">

  v-app( light)

    v-container( tag="section" )

        v-layout.mb-4( row, wrap, tag="section" )
          v-flex( xs12, md8, offset-md2, tag="article" )
            h4.title.indigo--text
              | Выбрать тип кирпича и тип кладки

        // SECTION MASONRY
        component-masonry

        // SECTION SEAM
        component-seam

        // SECTION BRICK
        component-brick

    // SECTION BUILDING
    component-building

    // SECTION OPENING
    v-container( tag="section", grid-list-lg )
      v-card( color="teal lighten-3" )
        v-card-text
          h4.title.white--text.mb-4
            | Добавить оконные и дверные проемы
          component-opening( v-for="(component, index) in components", :key="index", :id="index" )
          v-flex.text-xs-right( xs12, tag="section" )
            v-btn( color="teal lighten-2", dark, @click.native="onClick()" )
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
