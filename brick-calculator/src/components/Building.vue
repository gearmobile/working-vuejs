<template lang="pug">

  v-container

    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.title.indigo--text
          | Добавить размеры строения

    // Add Building Length, m
    v-layout( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.subheading.teal--text.mb-2
          | Введите длину строения, м
    v-layout.mb-4( row )
      v-flex( xs12, md8, offset-md2 )
        v-text-field(
          type="text",
          :counter="maskCounter",
          :hint="hintText",
          persistent-hint,
          name="length",
          id="length",
          label="Длина строения, м",
          v-model.trim="length",
          :mask="mask"
        )

    // Add Building Width, m
    v-layout( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.subheading.teal--text.mb-2
          | Введите ширину строения, м
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        v-text-field(
          type="text",
          :counter="maskCounter",
          :hint="hintText",
          persistent-hint,
          name="width",
          id="width",
          label="Ширина строения, м",
          v-model.trim="width",
          :mask="mask"
        )

    // Add Building Height, m
    v-layout( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        h4.subheading.teal--text.mb-2
          | Введите высоту строения, м
    v-layout.mb-4( row, wrap )
      v-flex( xs12, md8, offset-md2 )
        v-text-field(
          type="text",
          :counter="maskCounter",
          :hint="hintText",
          persistent-hint,
          name="height",
          id="height",
          label="Высота строения, м",
          v-model.trim="height",
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

