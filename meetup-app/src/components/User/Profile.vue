<template lang="pug">
  
  v-container( grid-list-md )
    
    v-layout.my-4( justify-center )
      h4.display-2.mb-0
        | Registered Meetups
    
    v-layout.mb-3( row, v-for="(meetup, index) in meetups", :key="index" )
      v-flex( xs12, sm10, offset-sm1, md8, offset-md2 )
        v-card( color="blue lighten-2" )
          v-container( fluid )
            v-layout( row )
              v-flex( xs5, sm4, md3, v-if="loading", justify-center )
                v-progress-circular( indeterminate, color="pink lighten-2", :width="5", :size="50" )
              v-flex( xs5, sm4, md3, v-else )
                v-card-media( :src="meetup.src", height="125px" )
              v-flex( xs7, sm8, md9 )
                v-card-title( primary-title )
                  section
                    h5.white--text.mb-1
                      | {{ meetup.title }}
                    article.pl-2
                      | {{ meetup.date }} {{ meetup.time }}
                v-card-actions( v-if="userAuthenticated" )
                  v-btn( flat, color="white", :to="'/meetupdetails/' + meetup.id" )
                    v-icon.white--text( left, light )
                      | arrow_forward
                    | view meetup

</template>

<script>
  export default {
    name: 'Profile',
    computed: {
      meetups () {
        return this.$store.getters.getRegisteredMeetups
      },
      loading () {
        return this.$store.getters.getLoading
      },
      userAuthenticated () {
        return this.$store.getters.getExistingUser !== null || this.$store.getters.getExistingUser !== undefined
      }
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>