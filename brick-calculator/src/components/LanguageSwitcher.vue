<template lang="pug">

  v-container.mb-4( grid-list-md )
    v-layout( row )
      v-flex( xs4, offset-xs8 )
        v-switch(
          :label="$t('switcher.label')",
          hide-details,
          color="red darken-3",
          v-model="language"
        )

</template>

<script>
  export default {
    name: 'LanguageSwitcher',
    data () {
      return {
        language: false
      }
    },
    watch: {
      language () {
        this.$i18n.locale = !this.language ? 'russian' : 'english'
      }
    }
  }
</script>

<style scoped>
  /**/
</style>
