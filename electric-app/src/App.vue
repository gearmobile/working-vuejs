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
  import One from './components/pages/one.vue'
  import Two from './components/pages/two.vue'
  import Three from './components/pages/three.vue'
  import Four from './components/pages/four.vue'
  import Description from './components/pages/description.vue'
  import Output from './components/shared/output.vue'
  import { mapActions } from 'vuex'

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
      ...mapActions({
        dataInit: 'initData',
        orderClear: 'clearOrder'
      }),
      onSwitch (value) {
        this.current = value
        this.orderClear()
      }
    },
    created () {
      this.dataInit()
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import './stylus/app'
</style>
