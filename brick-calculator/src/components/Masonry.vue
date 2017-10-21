<template lang="pug">
  
  v-container
    
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.title.indigo--text
          | Выбрать тип кирпича и тип кладки
    
    // Select Masonry Type
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.subheading.teal--text.mb-2
          | Выберите тип кирпичной кладки:
        v-select( single-line,
          label="Тип кирпичной кладки",
          :items="masonry",
          item-text="name",
          item-value="value",
          v-model="type"
        )

</template>

<script>
  export default {
    name: 'Masonry',
    computed: {
      masonry () {
        return this.$store.getters.getMasonry
      },
      type: {
        get () { return this.$store.getters.getMasonryCurrent },
        set (value) { this.$store.dispatch('setMasonry', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

