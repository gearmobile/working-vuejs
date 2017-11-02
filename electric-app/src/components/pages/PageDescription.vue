<template lang="pug">
  
  v-card
    
    v-card-title
      div
        .title.mb-2.teal--text
          | Калькулятор стоимости работ и материалов
        p
          | Для вашего удобства мы разработали максимально точный калькулятор электромонтажных работ
    
    v-card-text
      .headline.mb-2
        | Инструкция по использованию калькулятора
      p
        | Мы разработали для Вас удобный калькулятор стоимости работ и материалов. С его помощью Вы сможете самостоятельно оценить, какую сумму Вы потратите на выбранные Вами работы и необходимые для этого материалы.
      
      // ------------------------------
      // DESCRIPTION ITEMS
      // ------------------------------
      component-description( v-for="(item ,index) in items", :key="index", :item="item", :itemIndex="index" )

</template>

<script>
  import PageDescriptionItems from '../shared/PageDescriptionItem.vue'

  export default {
    name: 'PageDescription',
    computed: {
      items () {
        return this.$store.getters.getDescription
      }
    },
    components: {
      ComponentDescription: PageDescriptionItems
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>
