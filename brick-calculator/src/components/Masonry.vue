<template lang="pug">

  v-layout.mb-4( row, wrap, tag="section" )
    v-flex( xs12, md8, offset-md2, tag="article" )
      h4.subheading.teal--text.mb-2
        | Выберите тип кирпичной кладки:
      v-select(
        single-line,
        label="Тип кирпичной кладки",
        :items="items",
        item-text="name",
        item-value="value",
        v-model="item"
      )

</template>

<script>
  export default {
    name: 'Masonry',
    computed: {
      items () {
        return this.$store.getters.getMasonry
      },
      item: {
        get () { return this.$store.getters.getMasonryCurrent },
        set (value) { this.$store.dispatch('setMasonry', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

