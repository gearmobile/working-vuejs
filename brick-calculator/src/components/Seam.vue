<template lang="pug">

  v-card.mb-4( tag="section", color="teal lighten-3" )
    v-card-text
      v-select(
        single-line,
        label="Тип шва кирпичной кладки",
        :items="items",
        item-text="name",
        item-value="value",
        color="teal darken-2",
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
