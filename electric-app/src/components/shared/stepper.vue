<template lang="pug">
  v-layout.stepper( row, wrap, align-center )
    v-flex( xs12, md4 )
      v-subheader.stepper__title
        | {{ point.title }}
    v-flex.pr-3( xs12, md8 )
      v-text-field(
        single-line,
        prepend-icon='remove',
        append-icon='add',
        :append-icon-cb="(() => increment())",
        :prepend-icon-cb="(() => decrement())",
        v-model='value',
        @input="onInput()",
        hide-details
      )
</template>

<script>
  import { mapActions } from 'vuex'
  import eventBus from '../../main.js'

  export default {
    name: 'stepper',
    props: {
      point: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        value: null
      }
    },
    methods: {
      ...mapActions({
        orderAdd: 'addOrder',
        orderRemove: 'removeOrder'
      }),
      increment () {
        if (this.value < this.point.max) {
          this.value = (this.value || 0) + 1
          this.orderAdd({
            order: this.point,
            value: this.value
          })
        } else {
          return
        }
      },
      onInput () {
        this.orderAdd({
          order: this.point,
          value: this.value
        })
      },
      decrement () {
        if (this.value > this.point.min) {
          this.value = (this.value || 0) - 1
          this.orderRemove({
            order: this.point,
            value: this.value
          })
        } else {
          return
        }
      }
    },
    created () {
      eventBus.$on('onSwitch', () => {
        this.value = null
      })
    }
  }
</script>

<style lang="stylus">

  .stepper
    margin-bottom 1rem

    &:last-child
      margin-bottom 0

    & .icon
      cursor pointer !important
      background-color #008080 !important
      color #fff !important

      &:hover
        background-color #26a69a !important
        transition background-color .2s

    & .input-group__prepend-icon
      justify-content center !important

    & .input-group__details
      display none

    & .input-group__input
      padding .2rem !important
      border .1rem solid #008080

    & input
      padding 0 .6rem
      text-align center
      color #009688 !important

</style>
