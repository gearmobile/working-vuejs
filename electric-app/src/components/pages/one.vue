<template lang="pug">

  v-card.one
    v-card-text

      // HEADER
      v-layout( row )
        v-flex( xs12, md6 )
          v-radio(
            label="Кирпич",
            value="brick",
            v-model="material",
            hide-details
          )
        v-flex( xs12, md6 )
          v-radio(
            label="Бетон",
            value="concrete",
            v-model="material",
            hide-details
          )

      // MAIN
      v-layout.mb-2( row, wrap )
        app-stepper-list

      // ADDITIONAL
      v-layout( row, wrap )
        v-flex( xs12 )
          v-switch(
            label="Звонок",
            value="bell",
            v-model="additional",
            hide-details
          )
        v-flex( xs12 )
          v-switch(
            label="Щиток в подъезде",
            value="flapEntrance",
            v-model="additional",
            hide-details
          )
        v-flex( xs12 )
          v-switch(
            label="Щиток в помещении",
            value="flapIndoors",
            v-model="additional",
            hide-details
          )

</template>

<script>

  import stepperList from '../shared/stepperList.vue'
  import eventBus from '../../main.js'

  export default {
    computed: {
      material: {
        get () { return this.$store.getters.getMaterial },
        set (value) { this.$store.dispatch('setMaterial', value) }
      },
      additional: {
        get () { return this.$store.getters.getAdditional },
        set (value) { this.$store.dispatch('setAdditional', value) }
      }
    },
    watch: {
      material () {
        this.$store.dispatch('clearSwitch')
        eventBus.$emit('onSwitch')
      }
    },
    components: {
      appStepperList: stepperList
    }
  }

</script>

<style lang="stylus">
  //
</style>
