<template lang="pug">
  v-container
    
    // controls carousel
    v-layout.mb-2( row, wrap )
      v-flex.text-xs-center.text-sm-right( xs12, sm6 )
        v-btn.info( large, to="/meetuplist" )
          | explore meetups
      v-flex.text-xs-center.text-sm-left( xs12, sm6 )
        v-btn.info( large, to="/meetupnew" )
          | organize meetups
    
    // spin section
    v-layout.mb-2( row, v-if="loading" )
      v-flex.text-xs-center( xs12 )
        v-progress-circular( indeterminate, color="primary", :width="7", :size="70" )

    // carousel
    v-layout.mb-2( row, v-else )
      v-flex( xs12 )
        v-carousel
          v-carousel-item( style="cursor: pointer", v-for="(meetup, index) in meetups", transition="fade", reverseTransition="fade", :src="meetup.src", :key="index", @click="onClick(meetup.id)" )
            .carousel-caption
              | {{ meetup.title }}

    // carousel paragraph
    v-layout( row )
      v-flex( xs12 )
        p
          | paragraph carousel

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Start',
    computed: {
      ...mapGetters({
        meetups: 'getMeetupsShort',
        loading: 'getLoading'
      })
    },
    methods: {
      onClick (meetupID) {
        this.$router.push({ path: '/meetupdetails/' + meetupID })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carousel-caption {
    position: absolute;
    background-color: rgba( 0,0,0, .5 );
    color: white;
    bottom: 60px;
    font-size: 2rem;
    line-height: 1;
    text-transform: capitalize;
    padding: 20px 30px;
  }
</style>
