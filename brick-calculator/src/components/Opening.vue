<template lang="pug">
  
  
  v-card( tag="section" )
    v-card-text
    
      v-flex( xs12, tag="article" )
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
    
      v-flex( xs12, tag="article" )
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
    
      v-flex( xs12, tag="article" )
        v-btn( color="primary", @click="onClick()" )
          | удалить

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Opening',
    props: ['id'],
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
