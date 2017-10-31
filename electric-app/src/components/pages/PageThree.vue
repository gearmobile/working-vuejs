<template lang="pug">

  v-card.three
    v-card-text

      // HEADER
      v-layout( row )
        v-flex( xs12, md6 )
          v-radio( label="Кирпич", value="brick", name="brick", id="brick", v-model="material", hide-details )
        v-flex( xs12, md6 )
          v-radio( label="Бетон", value="concrete", name="concrete", id="concrete", v-model="material", hide-details )
        v-flex( xs12, md6 )
          v-radio( label="Гипсокартон", value="drywall", name="drywall", id="drywall", v-model="material", hide-details )

      // MAIN
      v-layout.mb-2( row, wrap)
        component-stepper-list

      // FOOTER
      v-layout( row, wrap )
        component-check( :item="items[0]" )
        component-check( :item="items[2]" )
        component-check( :item="items[3]" )

</template>

<script>
  const StepperList = () => import('../shared/StepperList.vue')
  const CheckIn = () => import('../shared/CheckIn.vue')

  export default {
    name: 'PageThree',
    computed: {
      material: {
        get () { return this.$store.getters.getMaterial },
        set (value) { this.$store.dispatch('setMaterial', value) }
      },
      items () {
        return this.$store.getters.getSupport
      }
    },
    components: {
      ComponentStepperList: StepperList,
      ComponentCheck: CheckIn
    }
  }
</script>
