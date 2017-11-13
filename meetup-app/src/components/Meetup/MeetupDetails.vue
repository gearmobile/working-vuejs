<template lang="pug">
  v-container
    v-layout( row )
      v-flex( xs12 )
        v-card

          v-card-title
            h5.primary--text.mb-0
              | {{ meetup.title }}
            v-spacer
            
            // EDIT MEETUP DETAILS
            template( v-if="isCreator" )
              component-edit( :meetup="meetup" )

          v-card-media( :src="meetup.src", height="400px" )

          v-card-text
            h6.card-info.info--text.mb-2
              | {{ meetup.date }} {{ meetup.time }} - {{ meetup.location }}
            
            // EDIT MEETUP DATE
            template( v-if="isCreator" )
              component-edit-date( :meetup="meetup" )
            
            // EDIT MEETUP TIME
            template( v-if="isCreator" )
              component-edit-time( :meetup="meetup" )
            
            p.mb-0.mt-2
              | {{ meetup.description }}

          v-card-actions
            v-spacer
            component-register( :meetupID="id" )

</template>

<script>
  import MeetupEdit from './MeetupEdit/MeetupDetailsEdit.vue'
  import MeetupEditDate from './MeetupEdit/MeetupDetailsEditDate.vue'
  import MeetupEditTime from './MeetupEdit/MeetupDetailsEditTime.vue'
  import RegisterDialog from './Registration/RegistrationDialog.vue'

  export default {
    name: 'MeetupDetails',
    props: {
      id: {
        type: String,
        required: true,
        default () { return '' }
      }
    },
    computed: {
      meetup () {
        return this.$store.getters.getMeetupFeatured(this.id)
      },
      isCreator () {
        if (this.$store.getters.getExistingUser === null || this.$store.getters.getExistingUser === undefined) {
          return false
        } else {
          return this.meetup.creator === this.$store.getters.getExistingUser.id
        }
      }
    },
    components: {
      ComponentEdit: MeetupEdit,
      ComponentEditDate: MeetupEditDate,
      ComponentEditTime: MeetupEditTime,
      ComponentRegister: RegisterDialog
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>