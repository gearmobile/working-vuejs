<template lang="pug">
  
  // ROOT
  v-app.app
    v-container

      // NAVIGATION SECTION
      v-layout.teal.lighten-3.text-xs-center.white--text.mb-3( row, wrap )
        v-flex.py-3.app__nav(
          xs12,
          md3,
          @click="onSwitch('ComponentOne')",
          :class="{ 'app__nav--active': current === 'ComponentOne' }"
        )
          .title
            | Квартира
        v-flex.py-3.app__nav(
          xs12,
          md3,
          @click="onSwitch('ComponentTwo')",
          :class="{ 'app__nav--active': current === 'ComponentTwo' }"
        )
          .title
            | Коттедж
        v-flex.py-3.app__nav(
          xs12,
          md3,
          @click="onSwitch('ComponentThree')",
          :class="{ 'app__nav--active': current === 'ComponentThree' }"
        )
          .title
            | Офис
        v-flex.py-3.app__nav(
          xs12,
          md3,
          @click="onSwitch('ComponentFour')",
          :class="{ 'app__nav--active': current === 'ComponentFour' }"
        )
          .title
            | Дача

      // OUTPUT SECTION
      v-layout( row, wrap )
        v-flex( xs12, md6 )
          v-fade-transition( mode="out-in" )
            keep-alive
              component( :is="current" )
          v-card.mt-4
            v-card-title.secondary.white--text.text-xs-center( style="text-transform: capitalize;" )
              .title( style="width: 100%" )
                | расчет
            v-card-text
              v-btn( block, color="primary", @click.native="onClick()", :disabled="!disableCalcButton" )
                v-icon( left, dark )
                  | attach_money
                | расчитать стоимость
              v-btn( block, color="secondary", @click.native="onReset()", v-if="show" )
                | вернуть назад
        v-flex( xs12, md6 )
          v-fade-transition( mode="out-in" )
            keep-alive
              component-description( v-if="!show" )
              component-output( v-else )

</template>

<script>
  const One = () => import('./components/pages/PageOne.vue')
  const Two = () => import('./components/pages/PageTwo.vue')
  const Three = () => import('./components/pages/PageThree.vue')
  const Four = () => import('./components/pages/PageFour.vue')
  const Description = () => import('./components/pages/PageDescription.vue')
  const Output = () => import('./components/shared/Output.vue')

  import EventBus from './events/eventBus'

  export default {
    data () {
      return {
        current: 'ComponentOne'
      }
    },
    components: {
      ComponentDescription: Description,
      ComponentOutput: Output,
      ComponentOne: One,
      ComponentTwo: Two,
      ComponentThree: Three,
      ComponentFour: Four
    },
    methods: {
      onSwitch (value) {
        this.current = value
        this.$store.dispatch('clearOrder')
      },
      onClick () {
        this.$store.dispatch('setShow')
      },
      onReset () {
        EventBus.$emit('ON_SWITCH_MATERIAL')
        this.$store.dispatch('clearOrder')
        this.$store.dispatch('clearAdditional')
        this.$store.dispatch('setShow')
      }
    },
    computed: {
      show () {
        return this.$store.getters.getStatus
      },
      disableCalcButton () {
        return this.$store.getters.getCheckInputs
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import './stylus/app'
</style>
