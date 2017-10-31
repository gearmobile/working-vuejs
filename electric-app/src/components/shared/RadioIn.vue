<template lang="pug">

  v-flex( xs12, md6 )
    v-radio(
      :label="item.label",
      :value="item.value",
      :name="item.value",
      :id="item.value",
      v-model="material",
      hide-details
    )

</template>

<script>
  export default {
    name: 'RadioIn',
    props: {
      item: {
        type: Object,
        default () { return {} }
      }
    },
    computed: {
      material: {
        get () { return this.$store.getters.getMaterial },
        set (value) { this.$store.dispatch('setMaterial', value) }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

