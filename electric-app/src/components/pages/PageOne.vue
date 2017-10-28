<template lang="pug">

  v-card.one
    v-card-text

      // HEADER
      v-layout( row )
        v-flex( xs12, md6 )
          v-radio(
            label="Кирпич",
            value="brick",
            name="brick",
            id="brick",
            v-model="material",
            hide-details
          )
        v-flex( xs12, md6 )
          v-radio(
            label="Бетон",
            value="concrete",
            name="concrete",
            concrete="concrete",
            v-model="material",
            hide-details
          )

      // MAIN
      v-layout.mb-2( row, wrap )
        app-stepper-list

      // ADDITIONAL
      v-layout( row, wrap )
        v-flex( xs12 )
          v-checkbox(
            label="Звонок",
            value="bell",
            name="bell",
            id="bell",
            v-model="additional",
            hide-details
          )
        v-flex( xs12 )
          v-checkbox(
            label="Щиток в подъезде",
            value="flapEntrance",
            name="flapEntrance",
            id="flapEntrance",
            v-model="additional",
            hide-details
          )
        v-flex( xs12 )
          v-checkbox(
            label="Щиток в помещении",
            value="flapIndoors",
            name="flapIndoors",
            id="flapIndoors",
            v-model="additional",
            hide-details
          )

</template>

<script>
  const StepperList = () => import('../shared/StepperList.vue')

  export default {
    name: 'PageOne',
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
    components: {
      appStepperList: StepperList
    }
  }

</script>
