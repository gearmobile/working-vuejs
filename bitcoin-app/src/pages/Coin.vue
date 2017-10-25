<template lang="pug">
  v-container
    v-layout( row, wrap )
      v-flex( xs12 )
        v-data-table.elevation-1( :items="items", :headers="headers", hide-actions )
          template( slot="items", slot-scope="props" )
            td.text-xs-center
              | {{ props.item.name }}
            td.text-xs-center
              | {{ props.item.symbol }}
            td.text-xs-center
              | {{ props.item.price_usd }}
            td.text-xs-center
              | {{ props.item.percent_change_24h }}
            td.text-xs-center
              | {{ props.item.percent_change_7d }}
</template>

<script>
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
          { text: 'Name', value: 'name', align: 'center', sortable: false },
          { text: 'Symbol', value: 'symbol', align: 'center', sortable: false },
          { text: 'Price ($)', value: 'usd', align: 'center', sortable: false },
          { text: '24 hours (%)', value: 'percent', align: 'center', sortable: false },
          { text: '7 days (%)', value: 'percent', align: 'center', sortable: false }
        ]
      }
    },
    computed: {
      items () {
        const result = []
        result.push(this.$store.getters.getCurrencySelected(this.id))
        return result
      }
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>
