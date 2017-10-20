<template lang="pug">
    
  // Add Length, m
  v-layout( row )
    v-flex( xs12, md6 )
      h4.subheading.teal--text.mb-2
        | Длина проема, м
    v-flex( xs12, md6 )
      v-text-field(
        name="oplength",
        :counter="9",
        hint="Не более девяти цифр",
        persistent-hint,
        id="oplength",
        label="Длина проема, м",
        v-model.trim="opening.length",
        :mask="mask",
        prepend-icon="aspect_ratio"
      )
  
  // Add Width, m
  v-layout( row, wrap )
    v-flex( xs12, md6 )
      h4.subheading.teal--text.mb-2
        | Ширина проема, м
    v-flex( xs12, md6 )
      v-text-field(
        name="opwidth",
        :counter="9",
        hint="Не более девяти цифр",
        persistent-hint,
        id="opwidth",
        label="Ширина проема, м",
        v-model.trim="opening.width",
        :mask="mask",
        prepend-icon="aspect_ratio"
      )

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'OpeningComponent',
    computed: {
      mask: 'getMask'
    }
  }
</script>

<style scoped>
  /**/
</style>

