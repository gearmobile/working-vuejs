<template lang="pug">

  v-layout.mb-4( row, wrap )
    v-flex( xs12, md8, offset-md2 )
      h4.subheading.teal--text.mb-2
        | Выберите тип шва кирпичной кладки:
      v-select(
        single-line,
        label="Тип шва кирпичной кладки",
        :items="items",
        item-text="name",
        item-value="value",
        v-model="item"
      )

</template>

<script>
  export default {
    name: 'Seam',
    computed: {
      items () {
        return this.$store.getters.getSeam
      },
      item: {
        get () { return this.$store.getters.getSeamCurrent },
        set (value) { this.$store.dispatch('setSeam', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

