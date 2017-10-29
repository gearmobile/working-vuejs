<template lang="pug">
  v-dialog( persistent, v-model="dialog", max-width="600px" )
    v-btn( color="primary", fab, small, dark, slot="activator" )
      v-icon
        | edit
    v-card
      v-container
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-title
              | edit meetup
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-text
              v-text-field( name="title", id="title", label="Title", v-model="meetup.title", required, hide-details )
              v-text-field( name="description", id="description", label="Description", v-model="meetup.description", textarea, rows="6", required, hide-details )
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-actions
              v-spacer
              v-btn( flat, color="amber darken-2", @click.native="dialog = false" )
                | close
              v-btn( flat, color="amber darken-2", @click.native="" )
                | save

</template>

<script>
  export default {
    name: 'MeetupDetailsEdit',
    data () {
      return {
        meetup: {
          title: '',
          description: ''
        },
        dialog: false
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

