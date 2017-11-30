<template lang="pug">

  v-app( light)
    
    // COMPONENT ALERT
    component-alert

    // CONTAINER
    v-container( tag="section", grid-list-lg )

      // SWITCH LANGUAGE SECTION
      component-switcher

      // TITLE SECTION
      component-title

      // STEPPER SECTION
      v-stepper( v-model="stage", vertical )
        
        // MASONRY SECTION
        v-stepper-step( step="1", :complete="stage > 1" )
          h4.headline
            | {{ $t('masonry.title') }}
          small
            | {{ $t('masonry.subtitle') }}
        v-stepper-content( step="1" )
          component-masonry
          v-btn( color="primary", @click.native="stepForward()" )
            | {{ $t('step.next') }}

        // SEAM SECTION
        v-stepper-step( step="2", :complete="stage > 2" )
          h4.headline
            | {{ $t('seam.title') }}
          small
            | {{ $t('seam.subtitle') }}
        v-stepper-content( step="2" )
          component-seam
          v-btn( color="primary", @click.native="stepForward()" )
            | {{ $t('step.next') }}
          v-btn( flat, color="error", @click.native="stepBackSeam()" )
            | {{ $t('step.back') }}

        // BRICK SECTION
        v-stepper-step( step="3", :complete="stage > 3" )
          h4.headline
            | {{ $t('brick.title') }}
          small
            | {{ $t('brick.subtitle') }}
        v-stepper-content( step="3" )
          component-brick
          v-btn( color="primary", @click.native="stepForward()" )
            | {{ $t('step.next') }}
          v-btn( flat, color="error", @click.native="stepBackBrick()" )
            | {{ $t('step.back') }}

        // BUILDING SECTION
        v-stepper-step( step="4", :complete="stage > 4" )
          h4.headline
            | {{ $t('building.title') }}
          small
            | {{ $t('building.subtitle') }}
        v-stepper-content( step="4" )
          component-building
          v-btn( color="primary", @click.native="stepForward()", :disabled="!buildingFields" )
            | {{ $t('step.next') }}
          v-btn( flat, color="error", @click.native="stepBackBuilding()" )
            | {{ $t('step.back') }}

        // SECTION OPENING
        v-stepper-step( step="5", :complete="stage > 5" )
          h4.headline
            | Добавить оконные и дверные проемы
          small
            | Здесь добавляются оконные и дверные проемы строения - ширина и высота, в метрах
        v-stepper-content( step="5" )
          component-opening
          v-btn( color="primary", @click.native="stepForward()", :disabled="!openingFields || areaCommonAndAreaOpening || checkCommon" )
            | {{ $t('step.next') }}
          v-btn( flat, color="error", @click.native="stepBackOpening()" )
            | {{ $t('step.back') }}

        // RESULT SECTION
        v-stepper-step( step="6" )
          h4.headline
            | Результат расчетов
          small
            | Здесь показаны результаты вычислений - кол-во кирпича, общая стоимость кирпича, общая площадь строения
        v-stepper-content( step="6" )
          component-output
          v-btn( color="success", @click.native="stepResetAllAndGoStart()" )
            | {{ $t('step.forward') }}

</template>

<script>
  import { mapGetters } from 'vuex'
  import SwitcherLanguage from './components/LanguageSwitcher.vue'
  import Title from './components/Title.vue'
  import Masonry from './components/Masonry.vue'
  import Seam from './components/Seam.vue'
  import Brick from './components/Brick.vue'
  import Building from './components/Building.vue'
  import Opening from './components/OpeningWrapper.vue'
  import Output from './components/Output.vue'
  import Alert from './components/Alert.vue'

  export default {
    data () {
      return {
        stage: 1
      }
    },
    methods: {
      stepForward () {
        this.stage += 1
      },
      stepBack () {
        this.stage -= 1
      },
      stepBackSeam () {
        this.$store.dispatch('resetSeamValue')
        this.stepBack()
      },
      stepBackBrick () {
        this.$store.dispatch('resetBrickValue')
        this.stepBack()
      },
      stepBackBuilding () {
        this.$store.dispatch('clearBuildingFields')
        this.stepBack()
      },
      stepBackOpening () {
        this.$store.dispatch('resetFieldsOpening')
        this.stepBack()
      },
      stepResetAllAndGoStart () {
        this.$store.dispatch('resetSeamValue')
        this.$store.dispatch('resetBrickValue')
        this.$store.dispatch('clearBuildingFields')
        this.$store.dispatch('resetFieldsOpening')
        this.stage = 1
      }
    },
    components: {
      ComponentSwitcher: SwitcherLanguage,
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
        maskCounter: 'getMaskCounter',
        buildingFields: 'checkFieldsBuilding',
        openingFields: 'checkFieldsOpening',
        areaCommonAndAreaOpening: 'checkAreaCommonAndAreaOpening',
        checkCommon: 'checkCommonLess'
      })
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
