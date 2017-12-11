<template lang="pug">

  v-card.mb-4( tag="section", color="" )
    v-card-text
      v-select(
        single-line,
        :items="items",
        item-text="name",
        item-value="value",
        color="",
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
