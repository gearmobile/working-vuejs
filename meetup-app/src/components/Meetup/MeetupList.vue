<template lang="pug">
  v-container
    v-layout.mb-3( row, v-for="(meetup, index) in meetups", :key="index" )
      v-flex( xs12, sm10, offset-sm1, md8, offset-md2 )
        v-card.info
          v-container( fluid )
            v-layout( row )
              v-flex( xs5, sm4, md3 )
                v-card-media( :src="meetup.src", height="125px" )
              v-flex( xs7, sm8, md9 )
                v-card-title( primary-title )
                  section
                    h5.white--text.mb-0
                      | {{ meetup.title }}
                    div
                      | {{ meetup.date }} {{ meetup.time }}
                v-card-actions
                  v-btn.orange--text( flat, :to="'/meetupdetails/' + meetup.id" )
                    v-icon.orange--text( left, light )
                      | arrow_forward
                    | view meetup
</template>

<script>
  export default {
    name: 'MeetupList',
    computed: {
      meetups () {
        return this.$store.getters.getMeetupsSorted
      }
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>