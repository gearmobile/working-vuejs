<template lang="pug">
  
  
  v-card.mb-4( tag="section", color="teal lighten-4" )
    
    v-card-text
      
      v-container( grid-list-xl, fluid, text-xs-center )
      
        v-layout( row, wrap )
      
          v-flex( xs12, sm5, tag="article" )
            v-text-field(
              name="width",
              v-model="width",
              id="width",
              label="Ширина, м",
              :mask="mask",
              :hint="hintText",
              persistent-hint,
              :counter="maskCounter"
            )
        
          v-flex( xs12, sm5, tag="article" )
            v-text-field(
              name="height",
              v-model="height",
              id="height",
              label="Длина, м",
              :mask="mask",
              :hint="hintText",
              persistent-hint,
              :counter="maskCounter"
            )
        
          v-flex( xs12, sm2, tag="article" )
            v-btn( color="teal lighten-2", dark, @click="onClick()" )
              | удалить

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Opening',
    props: ['id'], // TODO => add verifying support
    computed: {
      ...mapGetters({
        mask: 'getMaskOpening',
        maskCounter: 'getMaskOpeningCounter',
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
