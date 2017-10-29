<template lang="pug">
  v-container
    v-layout( row )
      v-flex( xs12 )
        v-card
          v-card-title
            h5.primary--text.mb-0
              | {{ meetup.title }}
            v-spacer
            template( v-if="isCreator" )
              component-meetup-edit( :meetup="meetup" )
          v-card-media( :src="meetup.src", height="400px" )
          v-card-text
            v-layout( row, justify-space-between )
              v-flex( xs6 )
                h6.card-info.info--text.mb-0
                  | {{ meetup.schedule.date }} {{ meetup.schedule.time }} - {{ meetup.location }}
              v-flex( xs6 )
                component-meetup-edit-date( :meetup="meetup" )
            p.mb-0
              | {{ meetup.description }}
          v-card-actions
            v-spacer
            v-btn.primary
              | register new meetup
</template>

<script>
  import MeetupEdit from './MeetupEdit/MeetupDetailsEdit.vue'
  import MeetupEditDateAndTime from './MeetupEdit/MeetupDetailsEditDateAndTime.vue'

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
      ComponentMeetupEdit: MeetupEdit,
      ComponentMeetupEditDate: MeetupEditDateAndTime
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>