<template lang="pug">

  q-layout

    .layout-view
      .layout-padding
        q-card
          q-card-title.bg-primary.text-white
            h4
              | What is a Crypto-Currency?
          q-card-main
            p
              | It's a digital currency in which encryption techniques are used to regulate the generation of units of currency and verify the transfer of funds, operating independently of a central bank.


</template>

<script>
  import { QLayout, QCard, QCardTitle, QCardMain } from 'quasar'

  export default {
    name: 'index',
    data () {
      return {
        //
      }
    },
    components: {
      QLayout,
      QCard,
      QCardTitle,
      QCardMain
    }
  }
</script>

<style lang="stylus">
  //
</style>
