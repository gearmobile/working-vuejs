<template lang="pug">


      v-list.teal.lighten-2( three-line )
        v-list-tile
          v-list-tile-avatar
            | {{ itemNumber }}
          v-list-tile-content
            v-list-tile-title.white--text
              | {{ item.title }}
            v-list-tile-sub-title
              | {{ item.subtitle }}
        v-divider( v-if="!show" )

</template>

<script>
  export default {
    name: 'DescriptionItem',
    props: {
      item: {
        type: Object,
        default () { return {} }
      },
      itemIndex: {
        type: Number,
        default () { return null }
      },
      itemDividerShow: {
        type: Number,
        default () { return null }
      }
    },
    computed: {
      itemNumber () {
        return this.itemIndex + 1
      },
      show () {
        return this.itemNumber === this.itemDividerShow
      }
    }
  }
</script>

<style lang="stylus" scoped>
  //
</style>

