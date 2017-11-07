<template lang="pug">

  v-card( tag="section", color="teal lighten-4" )
    v-card-text
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

