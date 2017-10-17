<template lang="pug">

  q-layout

    .layout-view
      .layout-padding
        q-card
          q-card-title.bg-primary.text-white
            h4
              | List of Currency
          q-card-main
            q-list
              q-item( striped, v-for="(item, index) in currency", :key="index" )
                q-item-main
                  q-item-tile( label )
                    | Name of Currency
                  q-item-tile( sublabel )
                    | {{ item.name }}
                q-item-main
                  q-item-tile( label )
                    | Price of Currency
                  q-item-tile( sublabel )
                    | {{ item.price_usd }}
                q-item-main
                  q-item-tile( label )
                    | Rank of Currency
                  q-item-tile( sublabel )
                    | {{ item.rank }}
              q-item-separator
</template>

<script>
  import { QLayout, QCard, QCardTitle, QCardMain, QList, QItem, QItemMain, QItemTile, QItemSeparator } from 'quasar'
  import axios from 'axios'
  const root = 'https://api.coinmarketcap.com/v1/ticker/'

  export default {
    name: 'about',
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
        axios.get(root, { params: { limit: 10 } })
          .then(response => {
            this.currency = response.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      this.getData()
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>
