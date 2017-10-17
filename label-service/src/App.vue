<template lang="pug">
  v-app( light )
    v-container
      v-layout( row, wrap )
        
        // LEFT COLUMN
        v-flex.pa-4( xs3 )
          h4.headline
            | Выберите цвет плашки
          section.plate( v-for="plate in plates", :key="plate.name" )
            article.plate__item( :style="{ backgroundColor: plate.value }", @click="onPickPlate(plate)" )
        
        // CENTER COLUMN
        v-flex.pa-4.picked( xs6 )
          v-layout( row )
            v-flex( xs12 )
              h4.headline
                | Вы выбрали цвет плашки - <span class="picked__name">{{ picked.color.name }}</span>
          
          // INPUT TEXT
          v-layout( row )
            v-flex( xs12 )
              h4.title
                | Введите свой текст
              v-text-field( name="text", id="text", label="Введите здесь текст", v-model="picked.caption.text", append-icon="remove_circle", :append-icon-cb="() => { picked.caption.text = null }", hint="At least 8 characters", min="8", counter )
          
          // SELECT FONT
          v-layout( row )
            v-flex( xs12 )
              v-radio-group
                v-layout( row )
                  v-radio-group( v-model="picked.caption.case" )
                    v-layout( row )
                      v-flex( xs6 )
                        v-radio( label="Uppercase", value="uppercase", hide-details )
                      v-flex( xs6 )
                        v-radio( label="Lowercase", value="lowercase", hide-details )

          // OUTPUT
          v-layout( row )
            v-flex( xs12 )
              section.output#output( :style="boxProps" )
                .output__row.output__row--top( v-if="picked.hole.show && picked.hole.top.show" )
                  .output__point.output__point--left
                  .output__point.output__point--right
                .output__row.output__row--middle( v-if="picked.hole.show && picked.hole.middle.show" )
                  .output__point.output__point--left
                  .output__point.output__point--right
                .output__row.output__row--bottom( v-if="picked.hole.show && picked.hole.bottom.show" )
                  .output__point.output__point--left
                  .output__point.output__point--right
                p.output__text( :style="textProps" )
                  | {{ picked.caption.text }}
                p.output__code( :style="codePosition" )
                  | {{ picked.code.value }}
                svg.icon--large( :style="{ color: picked.color.text }", v-for="(icon, index) in picked.icons", :key="index", @click="onIconSelect(index)" )
                  use( :xlink:href="'#' + icon" )

          // SELECT ADDITIONAL
          v-layout( row )
            v-flex( xs12 )
              v-layout( row )
                // select holes
                v-flex( xs6 )
                  v-switch( label="Holes", v-model="picked.hole.show", hide-details )
                  section.hole.pl-4( v-if="picked.hole.show", transition="scale-transition" )
                    v-switch( :label="picked.hole.top.name", v-model="picked.hole.top.show", color="orange", hide-details )
                    v-switch( :label="picked.hole.middle.name", v-model="picked.hole.middle.show", color="orange", hide-details )
                    v-switch( :label="picked.hole.bottom.name", v-model="picked.hole.bottom.show", color="orange", hide-details )
                // select code
                v-flex( xs6 )
                  v-switch.pb-4( label="Enter Code", v-model="picked.code.show", hide-details )
                  section.code.pl-4( v-if="picked.code.show", transition="scale-transition" )
                    the-mask.input( name="code", id="code", mask="###", label="Enter Code", v-model="picked.code.value" )
                    v-radio-group( v-model="picked.code.position.value" )
                      v-radio( :label="picked.code.position.left.name", value="left", color="orange darken-3", hide-details )
                      v-radio( :label="picked.code.position.right.name", value="right", color="orange darken-3", hide-details )

          // SELECT FONT COLOR
          v-layout.pt-4( row )
            v-flex( xs12 )
              h4.title
                | Выберите цвет надписи
              v-container.color( fluid, grid-list-lg )
                v-layout( row, wrap )
                  v-flex( xs2, v-for="color in colors", :key="color.name" )
                    v-card( flat, tile)
                      v-card-media.color__item( :style="{ backgroundColor: color.value }", @click="onPickColor(color)" )

        
        // RIGHT COLUMN
        v-flex.pa-4( xs3 )
          h4.title
            | Выберите изображение
          template
            // popular icons
            v-expansion-panel
              v-expansion-panel-content
                section( slot="header" )
                  | Популярные значки
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[0]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // sport icons
              v-expansion-panel-content
                section( slot="header" )
                  | Спорт
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[1]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // men icons
              v-expansion-panel-content
                section( slot="header" )
                  | Мужчины
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[2]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // women icons
              v-expansion-panel-content
                section( slot="header" )
                  | Женщины
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[3]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // goroscope icons
              v-expansion-panel-content
                section( slot="header" )
                  | Гороскоп
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[4]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // people icons
              v-expansion-panel-content
                section( slot="header" )
                  | Молодежь
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[5]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )
              // animals icons
              v-expansion-panel-content
                section( slot="header" )
                  | Животные
                v-container.px-4( fluid, grid-list-md )
                  v-layout.pb-2( row, wrap )
                    v-flex.item( xs2, v-for="(icon, index) in icons[6]", :key="index", @click="onPickIcon(icon)" )
                      svg.icon
                        use( :xlink:href="'#' + icon" )

</template>

<script>
  import { TheMask } from 'vue-the-mask'
  import Sortable from 'sortablejs'
  export default {
    data () {
      return {
        icons: [
          ['icon-fav-01', 'icon-fav-02', 'icon-fav-03'],
          ['icon-sport-01', 'icon-sport-02', 'icon-sport-03'],
          ['icon-men-01', 'icon-men-02', 'icon-men-03'],
          ['icon-women-01', 'icon-women-02', 'icon-women-03'],
          ['icon-goroscope-01', 'icon-goroscope-02', 'icon-goroscope-03'],
          ['icon-people-01', 'icon-people-02', 'icon-people-03'],
          ['icon-animal-01', 'icon-animal-02', 'icon-animal-03']
        ],
        plates: [
          { name: 'red', value: '#f44336' },
          { name: 'pink', value: '#e91e63' },
          { name: 'purple', value: '#9c27b0' },
          { name: 'indigo', value: '#3f51b5' },
          { name: 'blue', value: '#2196f3' },
          { name: 'teal', value: '#009688' },
          { name: 'green', value: '#4caf50' },
          { name: 'yellow', value: '#ffeb3b' },
          { name: 'amber', value: '#ffc107' },
          { name: 'orange', value: '#ff9800' },
          { name: 'blue-grey', value: '#607d8b' }
        ],
        colors: [
          { name: 'red', value: '#f44336' },
          { name: 'pink', value: '#e91e63' },
          { name: 'purple', value: '#9c27b0' },
          { name: 'deep-purple', value: '#673ab7' },
          { name: 'indigo', value: '#3f51b5' },
          { name: 'blue', value: '#2196f3' },
          { name: 'light-blue', value: '#03a9f4' },
          { name: 'cyan', value: '#00bcd4' },
          { name: 'teal', value: '#009688' },
          { name: 'green', value: '#4caf50' },
          { name: 'light-green', value: '#8bc34a' },
          { name: 'lime', value: '#cddc39' },
          { name: 'yellow', value: '#ffeb3b' },
          { name: 'amber', value: '#ffc107' },
          { name: 'orange', value: '#ff9800' },
          { name: 'deep-orange', value: '#ff5722' },
          { name: 'blue-grey', value: '#607d8b' },
          { name: 'grey', value: '#9e9e9e' }
        ],
        picked: {
          color: {
            border: null,
            background: '#009688',
            name: null,
            text: null
          },
          caption: {
            text: null,
            case: 'uppercase'
          },
          hole: {
            show: false,
            top: {
              show: false,
              name: 'top'
            },
            middle: {
              show: false,
              name: 'middle'
            },
            bottom: {
              show: false,
              name: 'bottom'
            }
          },
          code: {
            show: false,
            value: null,
            position: {
              value: 'left',
              left: {
                name: 'left',
                value: false
              },
              right: {
                name: 'right',
                value: false
              }
            }
          },
          icons: []
        }
      }
    },
    directives: {
      'sortable': {
        inserted (el, binding) {
          Sortable.create(document.querySelector('#output'), {
            animation: 400,
            draggable: 'div',
            ghostClass: 'sortable-ghost'
          })
        }
      }
    },
    methods: {
      onPickPlate (obj) {
        this.picked.color.background = obj.value
        this.picked.color.name = obj.name
      },
      onPickColor (obj) {
        this.picked.color.border = obj.value
        this.picked.color.text = obj.value
      },
      onPickIcon (icon) {
        this.picked.icons.push(icon)
      },
      onIconSelect (index) {
        this.picked.icons.splice(index, 1)
      }
    },
    computed: {
      codePosition () {
        const position = {}
        if (this.picked.code.position.value === 'left') {
          position.left = '2.4rem'
          position.right = 'auto'
        } else if (this.picked.code.position.value === 'right') {
          position.left = 'auto'
          position.right = '2.4rem'
        }
        position.color = this.picked.color.text
        return position
      },
      boxProps () {
        const prop = {
          borderColor: this.picked.color.border,
          backgroundColor: this.picked.color.background,
          boxShadow: '0 0 0 .3rem ' + this.picked.color.background
        }
        return prop
      },
      textProps () {
        const prop = {
          textTransform: this.picked.caption.case,
          color: this.picked.color.text
        }
        return prop
      }
    },
    components: {
      TheMask
    }
  }
</script>

<style lang="stylus" scoped>
  
  iconSize = 3rem
  iconRatio = 1.4

  .sortable-ghost {
    box-sizing: border-box;
    background-color: transparent !important;
    border: 2px dashed #ccc;
  }

  .sortable-ghost > span {
    visibility: hidden;
  }
  
  .icon {
    display: inline-block;
    width: iconSize;
    height: iconSize;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .icon--large {
    width iconSize * iconRatio
    height iconSize * iconRatio
    margin 0 .6rem
    cursor pointer
    stroke: currentColor;
    fill: currentColor;
    stroke-width: 0;
  }

  .item {
    display flex
    justify-content center
    align-items center
    cursor pointer
    outline 1px solid #000
  }

  .input
    border .1rem solid rgba( 0,0,0, .4 )
    width 100%
    padding .4rem 1rem
    font-size 1.2rem
    border-radius .4rem
    outline none

  // PICKED
  // --------------------
  .picked

    &__name
      text-transform uppercase

  // PLATE
  // ---------------------
  .plate

    &__item
      border-radius 4px
      width 100%
      height 50px
      margin-bottom 20px
      background-color teal
      cursor pointer

  // OUTPUT
  // --------------------
  .output
    border-radius .6rem
    width 100%
    height 100px
    display flex
    justify-content center
    align-items center
    font-size 2rem
    position relative
    border-width 4px
    border-style solid

    &__text
      margin-bottom 0
      font-size 4rem
      font-weight 700

    &__row
      position absolute
      width 100%
      padding 1rem
      left 0
      display flex
      justify-content space-between
      align-items center

      &--top
        top 0

      &--middle
        top 50%
        transform translate( 0, -50% )

      &--bottom
        bottom 0

    &__point
      width .4rem
      height .4rem
      border-radius 50%
      // background-color transparent
      background-color rgba( 0,0,0, .8 )
      // border .1rem solid rgba( 0,0,0, .8 )

    &__code
      position absolute
      top 1rem
      font-size 1.4rem
      line-height 1

  // COLOR SECTION
  // --------------------------
  .color

    &__item
      border .1rem solid rgba( 0,0,0, .3 )
      border-radius .4rem
      cursor pointer
      height 60px !important

</style>

