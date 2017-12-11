<template lang="pug">

  v-card.mb-4( color="teal lighten-3" )
    v-card-text
      
      // BRICK QUANTITTY
      v-layout( row, wrap, tag="section" )
        v-flex( xs12, md6 )
          | {{ $t('output.totalBricks') }}
        v-flex( xs12, md6 )
          | {{ quantity }}
      
      // COMMON AREA
      v-layout( row, wrap tag="section" )
        v-flex( xs12, md6 )
          | {{ $t('output.totalArea') }}
        v-flex( xs12, md6 )
          | {{ area }}
      
      // COMMON COST
      v-layout( row, wrap, tag="section" )
        v-flex( xs12, md6 )
          | {{ $t('output.totalCost') }}
        v-flex( xs12, md6 )
          | {{ $n(cost, 'currency') }}

</template>

<script>
  export default {
    name: 'Output',
    computed: {
      quantity () {
        const result = this.$store.getters.getBricksQuantity
        return result === 0 ? null : result
      },
      area () {
        const result = this.$store.getters.getAreaCommon
        return result === 0 ? null : result
      },
      cost () {
        const result = this.$store.getters.getCost
        return result === 0 ? null : result
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

