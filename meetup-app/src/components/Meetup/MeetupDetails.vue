<template lang="pug">
  v-container
    v-layout( row )
      v-flex( xs12 )
        v-card
          v-card-title
            h5.primary--text
              | {{ meetup.title }}
          v-card-media( :src="meetup.imageURL", height="400px" )
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
  export default {
    name: 'MeetupDetails',
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.getMeetupFeatured(this.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>