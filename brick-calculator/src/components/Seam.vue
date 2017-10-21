<template lang="pug">

  v-container
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.subheading.teal--text.mb-2
          | Выберите тип шва кирпичной кладки:
        v-select( single-line,
          label="Тип шва кирпичной кладки",
          :items="seam",
          item-text="name",
          item-value="value",
          v-model="type"
        )

</template>

<script>
  export default {
    name: 'Seam',
    computed: {
      seam () {
        return this.$store.getters.getSeam
      },
      type: {
        get () { return this.$store.getters.getSeamCurrent },
        set (value) { this.$store.dispatch('setSeam', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

