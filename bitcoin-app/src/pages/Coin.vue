<template lang="pug">
  v-container
    v-layout( row, wrap )
      v-flex( xs12 )
        v-data-table.elevation-1( :items="items", :headers="headers", hide-actions )
          template( slot="items", slot-scope="props" )
            td.text-xs-center
              | {{ props.item.rank }}
            td.text-xs-center
              | {{ props.item.name }}
            td.text-xs-center
              | {{ props.item.symbol }}
            td.text-xs-left
              | {{ props.item.price_usd }}
            td.text-xs-left
              | {{ props.item.percent_change_24h }}
            td.text-xs-left
              | {{ props.item.percent_change_7d }}
</template>

<script>
  import axios from '../plugins/axios.js'
  export default {
    name: 'Coin',
    props: {
      id: {
        type: String,
        default () { return '' }
      }
    },
    data () {
      return {
        headers: [
          { text: 'Rank', value: 'points', align: 'center', sortable: false },
          { text: 'Name', value: 'name', align: 'center', sortable: false },
          { text: 'Symbol', value: 'symbol', align: 'center', sortable: false },
          { text: 'Details', value: 'more', align: 'center', sortable: false },
          { text: 'Price ($)', value: 'usd', align: 'center', sortable: false },
          { text: '24 hours (%)', value: 'percent', align: 'center', sortable: false },
          { text: '7 days (%)', value: 'percent', align: 'center', sortable: false }
        ],
        items: []
      }
    },
    methods: {
      getData () {
        axios.get(this.id)
          .then(res => {
            this.items = res.data
          })
          .catch(err => {
            console.log(err)
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
