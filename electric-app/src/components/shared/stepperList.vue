<template lang="pug">
  
  v-flex( xs12 )
    app-stepper( v-for="(point, index) in points", :key="index", :point="point" )

</template>

<script>
  import stepper from './stepper.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'stepper-list',
    components: {
      appStepper: stepper
    },
    computed: {
      ...mapGetters({
        points: 'getData'
      })
    }
  }

</script>

<style lang="stylus" scoped>
  //
</style>

