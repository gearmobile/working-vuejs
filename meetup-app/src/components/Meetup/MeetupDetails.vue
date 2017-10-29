<template lang="pug">
  v-container
    v-layout( row )
      v-flex( xs12 )
        v-card
          v-card-title
            h5.primary--text.mb-0
              | {{ meetup.title }}
            v-spacer
            template( v-if="true" )
              component-meetup-edit
          v-card-media( :src="meetup.src", height="400px" )
          v-card-text
            h6.card-info.info--text
              | {{ meetup.schedule.date }} {{ meetup.schedule.time }} - {{ meetup.location }}
            p.mb-0
              | {{ meetup.description }}
          v-card-actions
            v-spacer
            v-btn.primary
              | register new meetup
</template>

<script>
  import MeetupEdit from './MeetupEdit/MeetupDetailsEdit.vue'

  export default {
    name: 'MeetupDetails',
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.getMeetupFeatured(this.id)
      }
    },
    components: {
      ComponentMeetupEdit: MeetupEdit
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>