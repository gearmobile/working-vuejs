<template lang="pug">
  
  v-container.mt-4
    v-layout.mb-4( row )
      v-flex( xs12, md8, offset-md2 )
        h4
          | create a new meetup
    v-layout( row )
      v-flex( xs12, md8, offset-md2 )
        form( @submit.prevent="onClick()" )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-text-field( name="title", id="title", label="Title", v-model="meetup.title", required, hide-details )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-text-field( name="location", id="location", label="Location", v-model="meetup.location", required, hide-details )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-btn.primary( @click="onTrigger()" )
                | upload image
              input( type="file", style="display: none", ref="fileInput", accept="image/*", @change="onFilePicked($event)" )
          v-layout.mb-4( row )
            v-flex( xs12 )
              img( :src="meetup.src", :alt="meetup.title", style="width: 100%; height: auto" )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-text-field( name="description", id="description", label="Description", v-model="meetup.description", textarea, rows="6", required, hide-details )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-date-picker( v-model="meetup.schedule.date" )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-time-picker( v-model="meetup.schedule.time", format="24hr" )
          v-layout.mb-4( row )
            v-flex( xs12 )
              v-btn.primary( :disabled="!formIsValid", type="submit" )
                | create new meetup

</template>

<script>
  export default {
    name: 'MeetupNew',
    data () {
      return {
        meetup: {
          title: '',
          location: '',
          description: '',
          image: null,
          src: '',
          schedule: {
            date: new Date(),
            time: new Date()
          }
        }
      }
    },
    computed: {
      formIsValid () {
        return this.meetup.title !== '' && this.meetup.location !== '' && this.meetup.description !== '' && this.meetup.image !== ''
      }
    },
    methods: {
      onClick () {
        if (this.meetup.image) {
          const meetup = {
            title: this.meetup.title,
            location: this.meetup.location,
            schedule: {
              date: this.meetup.schedule.date,
              time: this.meetup.schedule.time
            },
            description: this.meetup.description,
            image: this.meetup.image
          }
          this.$store.dispatch('createNewMeetup', meetup)
          this.$router.push({ path: '/meetuplist' })
        }
      },
      onTrigger () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        if (files[0].name.lastIndexOf('.') <= 0) {
          return alert('Add a valid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.meetup.src = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.meetup.image = files[0]
      }
    }
  }
</script>

<style lang="scss" scoped>
  //
</style>