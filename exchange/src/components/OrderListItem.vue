<template lang="pug">
  .grid
    .col-3
      p.order__title
        | order usd - ${{ order.usd_summ }}
    .col-3
      p.order__subtitle
        | summ btc - ${{ order.btc_summ | fix }}
    .col-3
      p.order__subtitle
        | price btc - ${{ order.btc_price }}
    .col-3
      button.order__button( type="button", name="sell", id="sell", @click="onSell()" )
        | sell
</template>

<script>
  import toFix from '../filters/fix'
  export default {
    name: 'OrderListItem',
    props: {
      order: {
        type: Object,
        required: true,
        default () { return {} }
      },
      index: {
        type: Number,
        required: true,
        default () { return null }
      }
    },
    methods: {
      onSell () {
        const order = {
          id: this.index,
          usdSumm: this.order.usd_summ,
          btcSumm: this.order.btc_summ,
          btcPrice: this.order.btc_price
        }
        if (order) {
          this.$store.dispatch('onSell', order)
          // console.log(order)
        }
        // this.$store.dispatch('onSell', order)
      }
    },
    filters: {
      fix: toFix
    }
  }
</script>

<style lang="scss" scoped>
  .order {
    background-color: #fff;
    padding: .2rem;
    margin-bottom: 1rem;

    &__title {
      height: 100%;
      margin: 0;
      text-align: center;
      background-color: lemonchiffon;
    }

    &__subtitle {
      height: 100%;
      margin: 0;
      text-align: center;
      background-color: lightblue;
    }

    &__button {
      background-color: lightpink !important;
    }
  }
</style>