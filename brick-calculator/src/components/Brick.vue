<template lang="pug">

  v-card.mb-4( tag="section" )
    v-card-text
      v-select( single-line,
        label="Тип кирпича",
        :items="bricks",
        item-text="name",
        item-value="value",
        color="teal darken-2",
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

