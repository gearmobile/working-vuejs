<template lang="pug">

  v-dialog( persistent, v-model="dialog", max-width="600px" )
    v-btn( color="primary", small, dark, slot="activator" )
      | edit date
    v-card
      v-container
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-title
              | edit meetup date
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
            v-date-picker( v-model="edit.date", style="width: 100%;", actions )
              template( scope="{ save, cancel }" )
                v-btn( color="amber darken-3", flat, @click.native="onClose()" )
                v-btn( color="amber darken-3", flat, @click.native="onSave()" )

</template>

<script>
  export default {
    name: 'MeetupDetailsEditDateAndTime',
    props: {
      meetup: {
        type: Object,
        required: true,
        default () { return {} }
      }
    },
    data () {
      return {
        dialog: false,
        edit: {
          date: this.meetup.schedule.date,
          time: this.meetup.schedule.time
        }
      }
    },
    methods: {
      onClose () {
        this.dialog = false
      },
      onSave () {
        this.onClose()
      }
    }
  }
</script>

<style scoped>
  /**/
</style>

