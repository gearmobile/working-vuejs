<template lang="pug">

  v-card.mb-4( tag="section", color="tre" )
    v-card-text
      v-select( single-line,
        :items="bricks",
        item-text="name",
        item-value="value",
        color="",
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

