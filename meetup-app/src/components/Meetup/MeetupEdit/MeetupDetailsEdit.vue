<template lang="pug">

  v-dialog( persistent, v-model="dialog", max-width="600px" )
    v-btn( color="info", fab, small, dark, slot="activator" )
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
              v-text-field( name="title", id="title", label="Title", v-model="meetupEdit.title", required, hide-details )
              v-text-field( name="description", id="description", label="Description", v-model="meetupEdit.description", textarea, rows="6", required, hide-details )
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-actions
              v-spacer
              v-btn( flat, color="primary darken-2", @click.native="onClose()" )
                | cancel
              v-btn( flat, color="primary darken-2", @click.native="onSave()" )
                | save

</template>

<script>
  export default {
    name: 'MeetupDetailsEdit',
    props: {
      meetup: {
        type: Object,
        required: true,
        default () { return {} }
      }
    },
    data () {
      return {
        meetupEdit: {
          title: this.meetup.title,
          description: this.meetup.description
        },
        dialog: false
      }
    },
    methods: {
      onSave () {
        if (this.meetupEdit.title === '' || this.meetupEdit.description === '') {
          return
        } else {
          const object = {
            title: this.meetupEdit.title,
            description: this.meetupEdit.description,
            id: this.meetup.id
          }
          this.$store.dispatch('updateMeetup', object)
          this.onClose()
        }
      },
      onClose () {
        this.dialog = false
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

