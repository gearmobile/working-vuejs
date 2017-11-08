<template lang="pug">

  v-dialog( persistent, v-model="meetupEdit.dialog", max-width="400px" )
    v-btn( color="info", dark, slot="activator" )
      | edit date
    v-card
      v-container
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-title
              h5.mb-0( style="text-transform: capitalize;" )
                | edit meetup date
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
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
          date: this.meetup.schedule.date
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

<style scoped>
  /**/
</style>

