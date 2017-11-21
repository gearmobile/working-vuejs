<template lang="pug">

  v-card.mb-4( color="teal lighten-3" )
    v-card-text
      v-container( grid-list-md )
        v-layout( row, wrap, tag="section" )
          
          v-flex( xs12, md4 )
            v-text-field(
              type="text",
              :counter="maskCounter",
              :hint="hintText",
              persistent-hint,
              name="length",
              id="length",
              label="Длина строения, м",
              v-model.trim="length",
              color="teal darken-2",
              :mask="mask"
            )

        v-flex( xs12, md4 )
          v-text-field(
            type="text",
            :counter="maskCounter",
            :hint="hintText",
            persistent-hint,
            name="width",
            id="width",
            label="Ширина строения, м",
            v-model.trim="width",
            color="teal darken-2",
            :mask="mask"
          )

        v-flex( xs12, md4 )
          v-text-field(
            type="text",
            :counter="maskCounter",
            :hint="hintText",
            persistent-hint,
            name="height",
            id="height",
            label="Высота строения, м",
            v-model.trim="height",
            color="teal darken-2",
            :mask="mask"
          )

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Building',
    computed: {
      ...mapGetters({
        mask: 'getMask',
        maskCounter: 'getMaskCounter',
        hintText: 'getHintText'
      }),
      length: {
        get () { return this.$store.getters.getBuildingLength },
        set (value) { this.$store.dispatch('setLength', value) }
      },
      width: {
        get () { return this.$store.getters.getBuildingWidth },
        set (value) { this.$store.dispatch('setWidth', value) }
      },
      height: {
        get () { return this.$store.getters.getBuildingHeight },
        set (value) { this.$store.dispatch('setHeight', value) }
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

