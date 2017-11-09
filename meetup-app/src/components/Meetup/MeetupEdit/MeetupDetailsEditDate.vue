<template lang="pug">

  v-dialog( persistent, v-model="meetupEdit.dialog", max-width="400px" )

    // TRIGGER DIALOG
    v-btn( color="info", dark, slot="activator" )
      | edit date

    // CONTENT SECTION
    v-card
      v-container
        
        v-layout.mb-2
          v-card-title
            h5.mb-0
              | Edit Meetup Date
        
        v-divider
        
        v-layout.mb-2
          v-date-picker( v-model="meetupEdit.date", actions, style="width: 100%" )
            template( scope="{ save, cancel }" )
              v-btn( color="primary darken-3", flat, @click.native="onClose()" )
                | cancel
              v-btn( color="primary darken-3", flat, @click.native="onSave()" )
                | save

</template>

<script>
  export default {
    name: 'MeetupDetailsEditDate',
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
          dialog: false,
          date: this.meetup.date
        }
      }
    },
    methods: {
      onSave () {
        const object = {
          date: this.meetupEdit.date,
          id: this.meetup.id
        }
        this.$store.dispatch('updateMeetup', object)
        this.onClose()
      },
      onClose () {
        this.meetupEdit.dialog = false
      }
    }
  }
</script>
