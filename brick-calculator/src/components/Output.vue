<template lang="pug">
  
  v-container( tag="section" )
    
    v-layout.mb-4( row, wrap, tag="section" )
      v-flex( xs12, md8, offset-md2, tag="article" )
        h4.title.indigo--text
          | Вывод:
    
    v-layout( row, wrap, tag="section" )
      v-flex( xs12, md8, offset-md2, tag="article" )
        
        v-layout( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            | Количество кирпича, шт
        v-layout.mb-4( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            h4.subheading.mb-0
              | {{ quantity }}
        
        v-layout( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            | Общая площадь, кв. м.
        v-layout.mb-4( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            h4.subheading.mb-0
              | {{ area }}
        
        v-layout( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            | Общая стоимость, руб.
        v-layout.mb-4( row, wrap, tag="section" )
          v-flex( xs12, md4, tag="article" )
            h4.subheading.mb-0
              | {{ cost }}

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Output',
    computed: {
      ...mapGetters({
        quantity: 'getBricksQuantity',
        area: 'getAreaCommon',
        cost: 'getBricksCost'
      })
    }
  }
</script>

<style scoped>
  /**/
</style>

