<template lang="pug">

  v-layout.mb-4( row, wrap, tag="section" )
    v-flex( xs12, md8, offset-md2, tag="article" )
      h4.subheading.teal--text.mb-2
        | Выберите тип кирпича:
      v-select( single-line,
        label="Тип кирпича",
        :items="bricks",
        item-text="name",
        item-value="value",
        v-model="type"
      )

</template>

<script>
  export default {
    name: 'Brick',
    computed: {
      bricks () {
        return this.$store.getters.getBrick
      },
      type: {
        get () { return this.$store.getters.getBrickCurrent },
        set (value) { this.$store.dispatch('setBrick', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

