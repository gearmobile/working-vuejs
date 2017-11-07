<template lang="pug">

  v-app( light)
    
    // COMPONENT ALERT
    component-alert

    // CONTAINER
    v-container( tag="section", grid-list-lg )

      // SECTION TITLE
      component-title

      // SECTION MASONRY
      component-masonry

      // SECTION SEAM
      component-seam

      // SECTION BRICK
      component-brick

      // SECTION BUILDING
      component-building

      // SECTION OPENING
      component-opening

      // SECTION OUTPUT
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
