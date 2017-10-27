<template lang="pug">
  
  // ROOT
  v-app.app
    v-container

      // NAVIGATION SECTION
      v-layout.amber.text-xs-center.white--text.mb-3( row, wrap )
        v-flex.py-3.app__nav( xs12, md3, @click="onSwitch('appOne')", :class="{ 'app__nav--active': current === 'appOne' }" )
          .title
            | Квартира
        v-flex.py-3.app__nav( xs12, md3, @click="onSwitch('appTwo')", :class="{ 'app__nav--active': current === 'appTwo' }" )
          .title
            | Коттедж
        v-flex.py-3.app__nav( xs12, md3, @click="onSwitch('appThree')", :class="{ 'app__nav--active': current === 'appThree' }" )
          .title
            | Офис
        v-flex.py-3.app__nav( xs12, md3, @click="onSwitch('appFour')", :class="{ 'app__nav--active': current === 'appFour' }" )
          .title
            | Дача

      // OUTPUT SECTION
      v-layout( row, wrap )
        v-flex( xs12, md6 )
          v-fade-transition( mode="out-in" )
            keep-alive
              component( :is="current" )
          v-card.mt-4
            v-card-title.secondary.white--text.text-xs-center( style="text-transform: capitalize" )
              .title( style="width: 100%" )
                | расчет
            v-card-text
              v-btn( block, primary )
                v-icon( left, dark )
                  | attach_money
                | расчитать стоимость
        v-flex( xs12, md6 )
          app-description
          app-output

</template>

<script>
  const One = () => import('./components/pages/PageOne.vue')
  const Two = () => import('./components/pages/PageTwo.vue')
  const Three = () => import('./components/pages/PageThree.vue')
  const Four = () => import('./components/pages/PageFour.vue')
  const Description = () => import('./components/pages/PageDescription.vue')
  const Output = () => import('./components/shared/ComponentOutput.vue')

  export default {
    data () {
      return {
        current: 'appOne'
      }
    },
    components: {
      appDescription: Description,
      appOutput: Output,
      appOne: One,
      appTwo: Two,
      appThree: Three,
      appFour: Four
    },
    methods: {
      onSwitch (value) {
        this.current = value
        this.$store.dispatch('clearOrder')
      }
    },
    created () {
      this.$store.dispatch('initData')
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import './stylus/app'
</style>
