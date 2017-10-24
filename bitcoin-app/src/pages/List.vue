<template lang="pug">
  v-container
    v-layout( row, wrap )
      v-flex( xs12 )
        v-data-table.elevation-1( :items="items", :headers="headers", hide-actions )
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
  import axios from '../plugins/axios.js'
  export default {
    name: 'List',
    data () {
      return {
        headers: [
          { text: 'Rank', value: 'points', align: 'center', sortable: false },
          { text: 'Name', value: 'name', align: 'left', sortable: false },
          { text: 'Symbol', value: 'symbol', align: 'left', sortable: false },
          { text: 'Price ($)', value: 'usd', align: 'left' },
          { text: '24 hours (%)', value: 'percent', align: 'left' },
          { text: '7 days (%)', value: 'percent', align: 'left' }
        ],
        items: []
      }
    },
    methods: {
      getData () {
        axios.get('?limit=10')
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
