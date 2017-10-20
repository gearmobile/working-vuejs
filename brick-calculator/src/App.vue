<template lang="pug">
  v-app( light)
    
    // SECTION TOP
    v-container
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Выбрать тип кирпича и тип кладки
      
      // Select Masonry Type
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Выберите тип кирпичной кладки:
          v-select( single-line,
            label="Тип кирпичной кладки",
            :items="masonry",
            item-text="name",
            item-value="value",
            v-model="order.masonry"
          )
      
      // Select Seam Type
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Выберите тип шва кирпичной кладки:
          v-select( single-line,
            label="Тип шва кирпичной кладки",
            :items="seam",
            item-text="name",
            item-value="value",
            v-model="order.seam"
          )
      
      // Select Brick Type
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Выберите тип кирпича:
          v-select( single-line,
            label="Тип кирпича",
            :items="bricks",
            item-text="name",
            item-value="value",
            v-model="order.brick"
          )
  
    // SECTION SECOND
    v-container
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Добавить размеры строения
      
      // Add Building Length, m
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Введите длину строения, м
      v-layout.mb-4( row )
        v-flex( xs12, md8, offset-md2 )
          v-text-field( type="text", :counter="9", hint="Не более девяти цифр", persistent-hint, name="length", id="length", label="Длина строения, м", v-model.trim="building.length", :mask="mask", prepend-icon="aspect_ratio" )
      
      // Add Building Width, m
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Введите ширину строения, м
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-text-field( type="text", :counter="9", hint="Не более девяти цифр", persistent-hint, name="width", id="width", label="Ширина строения, м", v-model.trim="building.width", :mask="mask", prepend-icon="aspect_ratio" )
      
      // Add Building Height, m
      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.subheading.teal--text.mb-2
            | Введите высоту строения, м
      v-layout.mb-4( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-text-field( type="text", :counter="9", hint="Не более девяти цифр", persistent-hint, name="height", id="height", label="Высота строения, м", v-model.trim="building.height", :mask="mask", prepend-icon="aspect_ratio" )
    
    // SECTION THIRD
    v-container

      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          h4.title.indigo--text
            | Добавить оконные и дверные проемы
      
      app-dummy( v-for="n in componentCounter", :key="n" )

      v-layout( row, wrap )
        v-flex( xs12, md8, offset-md2 )
          v-btn.primary( @click="onAdd()" )
            | add component
          v-btn.primary( @click="onRemove()" )
            | remove component
      

    
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
  import Dummy from './components/Dummy.vue'

  export default {
    data () {
      return {
        order: {
          masonry: '0.5',
          brick: 'одинарный',
          seam: 0
        },
        masonry: [
          { name: 'Кладка в 0,5 кирпича', value: '0.5' },
          { name: 'Кладка в 1 кирпич', value: '1' },
          { name: 'Кладка в 1,5 кирпича', value: '1.5' },
          { name: 'Кладка в 2 кирпича', value: '2' },
          { name: 'Кладка в 2,5 кирпича', value: '2.5' }
        ],
        bricks: [
          { name: 'Одинарный (250×120×65 мм)', value: 'одинарный', length: 250, width: 120, height: 65, price: 7 },
          { name: 'Полуторный (250×120×88 мм)', value: 'полуторный', length: 250, width: 120, height: 88, price: 14 },
          { name: 'Двойной (250×120×140 мм)', value: 'двойной', length: 250, width: 120, height: 140, price: 21 },
          { name: 'ЕВРО (250×85×65 мм)', value: 'ЕВРО', length: 250, width: 85, height: 65, price: 28 }
        ],
        seam: [
          { name: 'Без учета растворного шва', value: 0 },
          { name: 'С учетом растворного шва толщиной 5 мм', value: 5 },
          { name: 'С учетом растворного шва толщиной 10 мм', value: 10 },
          { name: 'С учетом растворного шва толщиной 15 мм', value: 15 },
          { name: 'С учетом растворного шва толщиной 20 мм', value: 20 }
        ],
        building: {
          length: null,
          width: null,
          height: null
        },
        opening: {
          length: null,
          width: null
        }
      }
    },
    components: {
      appDummy: Dummy
    },
    methods: {
      ...mapActions({
        counterIncrease: 'increaseCounter',
        counterDecrease: 'decreaseCounter'
      }),
      onAdd () {
        this.counterIncrease()
      },
      onRemove () {
        this.counterDecrease()
      }
    },
    computed: {
      ...mapGetters({
        mask: 'getMask',
        componentCounter: 'getCounter'
      }),
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
