<template lang="pug">

  v-list( three-line )
    v-list-tile
      v-list-tile-avatar
        | {{ itemNumber }}
      v-list-tile-content
        v-list-tile-title
          | {{ item.title }}
        v-list-tile-sub-title
          | {{ item.subtitle }}
    v-divider

</template>

<script>
  export default {
    name: 'PageDescriptionItem',
    props: {
      item: {
        type: Object,
        default () { return {} }
      },
      itemIndex: {
        type: Number,
        default () { return null }
      }
    },
    computed: {
      itemNumber () {
        return this.itemIndex + 1
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

