<template lang="pug">
  
  v-app( light)
    
    // SECTION MASONRY
    component-masonry

    // SECTION SEAM
    component-seam

    // SECTION BRICK
    component-brick
  
    // SECTION BUILDING
    component-building

    // SECTION OPENING
    v-container
      v-layout( row, wrap )
        v-flex.mb-4( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Добавить оконные и дверные проемы
      v-layout( row, wrap )
        v-flex.mb-4( xs12, md8, offset-md2 )
          component-opening( v-for="(component, index) in components", :key="index", :id="index" )
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-btn.primary( @click="onAdd()" )
            | добавить проем
    
    // SECTION FOURTH
    v-container
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Вывод:
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-layout( row, wrap )
            v-flex( xs12, md4 )
              | Количество кирпича, шт
          v-layout.mb-4( row, wrap )
            v-flex( xs12, md4 )
              h4.subheading.mb-0
                | {{ bricksQuantity }}
          v-layout( row, wrap )
            v-flex( xs12, md4 )
              | Общая площадь, кв. м.
          v-layout.mb-4( row, wrap )
            v-flex( xs12, md4 )
              h4.subheading.mb-0
                | {{ areaCommon }}
          v-layout( row, wrap )
            v-flex( xs12, md4 )
              | Общая стоимость, руб.
          v-layout.mb-4( row, wrap )
            v-flex( xs12, md4 )
              h4.subheading.mb-0
                | {{ bricksCost }}

</template>

<script>
  import _ from 'lodash'
  import { mapGetters, mapActions } from 'vuex'
  import Masonry from './components/Masonry.vue'
  import Seam from './components/Seam.vue'
  import Brick from './components/Brick.vue'
  import Building from './components/Building.vue'
  import Opening from './components/Opening.vue'

  export default {
    data () {
      return {
        hintText: 'Целые числа'
      }
    },
    components: {
      componentMasonry: Masonry,
      componentSeam: Seam,
      componentBrick: Brick,
      componentBuilding: Building,
      componentOpening: Opening
    },
    methods: {
      ...mapActions({
        componentAdd: 'addComponent'
      }),
      onAdd () {
        this.componentAdd()
      }
    },
    computed: {
      ...mapGetters({
        mask: 'getMask',
        components: 'getOpening'
      }),
      maskCounter () {
        return this.mask.length
      },
      seamWidth () {
        return this.order.seam / 1000
      },
      squareLengthHeight () {
        const result = (this.selectedBrick.length / 1000 + this.seamWidth) * (this.selectedBrick.height / 1000 + this.seamWidth)
        return result
      },
      squareWidthHeight () {
        const result = (this.selectedBrick.width / 1000 + this.seamWidth) * (this.selectedBrick.height / 1000 + this.seamWidth)
        return result
      },
      bricksQuantity () {
        let result = null
        switch (this.order.masonry) {
          case '0.5':
            result = Math.ceil(1 / this.squareLengthHeight)
            break
          case '1':
            result = Math.ceil(1 / this.squareWidthHeight)
            break
          case '1.5':
            result = Math.ceil(1 / this.squareLengthHeight) + Math.ceil(1 / this.squareWidthHeight)
            break
          case '2':
            result = (Math.ceil(1 / this.squareWidthHeight)) * 2
            break
          case '2.5':
            result = Math.ceil(1 / this.squareLengthHeight) + (Math.ceil(1 / this.squareWidthHeight)) * 2
            break
        }
        result = (this.areaCommon - this.areaOpening) * result
        return result
      },
      bricksCost () {
        const result = this.bricksQuantity * this.selectedBrick.price
        return result
      },
      areaCommon () {
        if (_.isNil(this.building.length) || _.isNil(this.building.width) || _.isNil(this.building.height)) {
          return null
        }
        const result = ((_.toNumber(this.building.length) + _.toNumber(this.building.width)) * 2) * _.toNumber(this.building.height)
        return result
      },
      areaOpening () {
        if (_.isNil(this.opening.length) || _.isNil(this.opening.width)) {
          return 0
        }
        const result = (this.opening.length + this.opening.width) * 2
        return result
      },
      selectedBrick () {
        const result = _.find(this.bricks, { 'value': this.order.brick })
        return result
      }
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
</style>
