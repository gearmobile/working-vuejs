<template lang="pug">

  v-app( light)
    
    // COMPONENT ALERT
    component-alert

    // CONTAINER
    v-container( tag="section", grid-list-lg )
      v-card( color="teal lighten-4" )
        v-card-text

          // SECTION TITLE
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-title

          // SECTION MASONRY
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-masonry

          // SECTION SEAM
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-seam

          // SECTION BRICK
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-brick

          // SECTION BUILDING
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-building

          // SECTION OPENING
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-opening

          // SECTION OUTPUT
          v-layout( row )
            v-flex( xs12, md8, offset-md2 )
              component-output

</template>

<script>
  import { mapGetters } from 'vuex'
  import Title from './components/Title.vue'
  import Masonry from './components/Masonry.vue'
  import Seam from './components/Seam.vue'
  import Brick from './components/Brick.vue'
  import Building from './components/Building.vue'
  import Opening from './components/OpeningWrapper.vue'
  import Output from './components/Output.vue'
  import Alert from './components/Alert.vue'

  export default {
    components: {
      ComponentMasonry: Masonry,
      ComponentSeam: Seam,
      ComponentBrick: Brick,
      ComponentBuilding: Building,
      ComponentOpening: Opening,
      ComponentOutput: Output,
      ComponentAlert: Alert,
      ComponentTitle: Title
    },
    computed: {
      ...mapGetters({
        mask: 'getMask',
        maskCounter: 'getMaskCounter'
      })
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
