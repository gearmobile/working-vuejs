<template lang="pug">

  v-dialog( persistent, v-model="meetupEdit.dialog", max-width="400px" )
    v-btn( color="info", dark, slot="activator" )
      | edit time
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
            v-time-picker( v-model="meetupEdit.time", actions, style="width: 100%" )
              template( scope="{ save, cancel }" )
                v-btn( color="primary darken-3", flat, @click.native="onClose()" )
                  | cancel
                v-btn( color="primary darken-3", flat, @click.native="onSave()" )
                  | save

</template>

<script>
  export default {
    name: 'MeetupDetailsEditTime',
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
          time: this.meetup.time
        }
      }
    },
    methods: {
      onSave () {
        const newTime = {
          time: this.meetupEdit.time,
          id: this.meetup.id
        }
        this.$store.dispatch('updateMeetup', newTime)
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

