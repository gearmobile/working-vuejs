<template lang="pug">

  v-card.mb-4( tag="section", color="teal lighten-3" )
    v-card-text
      v-select(
        single-line,
        label="Тип кирпичной кладки",
        :items="items",
        item-text="name",
        item-value="value",
        color="teal darken-2",
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

