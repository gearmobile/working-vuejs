<template lang="pug">
  v-container
    v-layout( row, wrap )
      v-flex( xs12 )
        v-data-table( :items="items", hide-actions )
          template( slot="items", slot-scope="props" )
            td.text-xs-center
              | {{ props.item.rank }}
            td.text-xs-left
              | {{ props.item.name }}
            td.text-xs-left
              | {{ props.item.symbol }}
            td.text-xs-left
              | {{ props.item.price_usd }}
            td.text-xs-left
              | {{ props.item.percent_change_24h }}
            td.text-xs-left
              | {{ props.item.percent_change_7d }}

</template>

<script>
  import axios from 'axios'
  const root = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
  export default {
    name: 'List',
    data () {
      return {
        items: []
      }
    },
    methods: {
      getData () {
        axios.get(root)
          .then(response => {
            this.items = response.data
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

<style lang="scss" scoped>
  //
</style>
