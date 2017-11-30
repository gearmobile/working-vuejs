<template lang="pug">
  
  
  v-card.mb-4( tag="section", color="teal lighten-4" )
    
    v-card-text.pa-3
      
      v-layout( row, wrap )
    
        v-flex( xs12, sm4, tag="article" )
          v-text-field(
            name="width",
            v-model="width",
            id="width",
            :label="$t('opening.width')",
            :mask="mask",
            :hint="hintText",
            persistent-hint,
            color="teal darken-2"
          )
      
        v-flex( xs12, sm4, tag="article" )
          v-text-field(
            name="height",
            v-model="height",
            id="height",
            :label="$t('opening.height')",
            :mask="mask",
            :hint="hintText",
            persistent-hint,
            color="teal darken-2"
          )
      
        v-flex.text-xs-center.opening-control( xs12, sm4, tag="article", v-if="id !== 0" )
          v-btn.ma-0( color="teal lighten-2", dark, @click="onClick()" )
            | удалить

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Opening',
    props: {
      id: {
        type: Number,
        required: true,
        default () { return null }
      }
    },
    computed: {
      ...mapGetters({
        mask: 'getMaskOpening',
        hintText: 'getHintText'
      }),
      width: {
        get () { return this.$store.getters.getOpeningWidth(this.id) },
        set (value) { this.$store.dispatch('setOpeningWidth', { index: this.id, value: value }) }
      },
      height: {
        get () { return this.$store.getters.getOpeningHeight(this.id) },
        set (value) { this.$store.dispatch('setOpeningHeight', { index: this.id, value: value }) }
      }
    },
    methods: {
      onClick () {
        this.$store.dispatch('removeComponent', this.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  
  .opening-control
    display: flex
    justify-content: flex-end
    align-items: center

</style>

