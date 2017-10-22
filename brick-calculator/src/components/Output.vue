<template lang="pug">
  
  v-container
    
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.title.indigo--text
          | Вывод:
    
    v-layout( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        
        v-layout( row, wrap )
          v-flex( xs12, md4 )
            | Количество кирпича, шт
        v-layout.mb-4( row, wrap )
          v-flex( xs12, md4 )
            h4.subheading.mb-0
              | {{ quantity }}
        
        v-layout( row, wrap )
          v-flex( xs12, md4 )
            | Общая площадь, кв. м.
        v-layout.mb-4( row, wrap )
          v-flex( xs12, md4 )
            h4.subheading.mb-0
              | {{ area }}
        
        v-layout( row, wrap )
          v-flex( xs12, md4 )
            | Общая стоимость, руб.
        v-layout.mb-4( row, wrap )
          v-flex( xs12, md4 )
            h4.subheading.mb-0
              | {{ cost }}
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Output',
    computed: {
      ...mapGetters({
        quantity: 'bricksQuantity',
        area: 'areaCommon',
        cost: 'bricksCost'
      })
    }
  }
</script>

<style scoped>
  /**/
</style>

