<template lang="pug">

  v-dialog( persistent, v-model="dialog.show" )

    // TRIGGER DIALOG
    v-btn( color="success", dark, slot="activator" )
      | {{ registerLabel }}

    // CONTENT SECTION
    v-card
      v-container
        
        v-layout.mb-2
          v-card-title( v-if="userIsRegistered" )
            h5.mb-0
              | Unregister from Meetup?
          v-card-title( v-else )
            h5.mb-0
              | Register for Meetup?
        
        v-divider
        
        v-layout.mb-2
          v-card-text
            | You can always change your decision later on

        v-layout.mb-2
          v-card-actions
            v-btn( flat, color="red darken-1", @click="onCloseHandler()" )
              | cancel
            v-btn( flat, color="green darken-1", @click="onSaveHandler()" )
              | confirm

</template>

<script>
  export default {
    name: 'RegistartionDialog',
    props: {
      meetupID: {
        type: String,
        required: true,
        default () { return '' }
      }
    },
    data () {
      return {
        dialog: {
          show: false
        }
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.getExistingUser.meetups.findIndex(el => {
          return el === this.meetupID
        }) >= 0
      },
      registerLabel () {
        return this.userIsRegistered ? 'Unregister' : 'Register'
      }
    },
    methods: {
      onCloseHandler () {
        if (userIsRegistered) {
          this.$store.dispatch('unregisterUserMeetup', this.meetupID)
        } else {
          this.$store.dispatch('registerUserMeetup', this.meetupID)
        }
        this.dialog.show = false
      },
      onSaveHandler () {
        this.onCloseHandler()
      }
    }
  }
</script>
