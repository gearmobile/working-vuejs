<template lang="pug">
  
  q-layout
    
    .layout-view
      .layout-padding
        q-card
          q-card-title
            | {{ currency.name }}
          q-card-main
            q-list
              q-item
                q-item-main
                  q-item-tile( label )
                    | Symbol
                  q-item-tile( sublabel )
                    | {{ currency.symbol }}
              q-item-separator
              q-item
                q-item-main
                  q-item-tile( label )
                    | Price (USD)
                  q-item-tile( sublabel )
                    | {{ currency.price_usd }}
              q-item-separator
              q-item
                q-item-main
                  q-item-tile( label )
                    | Rank
                  q-item-tile( sublabel )
                    | {{ currency.rank }}

</template>

<script>
  import axios from 'axios'
  import { QLayout, QCard, QCardTitle, QCardMain, QList, QItem, QItemMain, QItemTile, QItemSeparator } from 'quasar'

  const root = 'https://api.coinmarketcap.com/v1/ticker/'

  export default {
    name: 'coins',
    data () {
      return {
        currency: {}
      }
    },
    components: {
      QLayout,
      QCard,
      QCardTitle,
      QCardMain,
      QList,
      QItem,
      QItemMain,
      QItemTile,
      QItemSeparator
    },
    methods: {
      getData () {
        axios.get(root + this.$route.params.id + '/')
          .then(response => {
            this.currency = response.data[0]
            console.log(response.data[0])
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      this.getData()
    },
    watch: {
      '$route': 'getData'
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>
