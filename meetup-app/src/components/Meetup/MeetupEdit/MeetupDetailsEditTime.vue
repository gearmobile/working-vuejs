<template lang="pug">

  v-dialog( persistent, v-model="dialog", max-width="400px" )
    v-btn( color="info", dark, slot="activator" )
      | edit meetup time
    v-card
      v-container
        v-layout( row, wrap )
          v-flex( xs12 )
            v-card-title
              h5.mb-0( style="text-transform: capitalize;" )
                | edit meetup date
        v-divider
        v-layout( row, wrap )
          v-flex( xs12 )
            v-time-picker( v-model="edit.time", actions, style="width: 100%" )
              template( scope="{ save, cancel }" )
                v-btn( color="primary darken-3", flat, @click.native="onClose()" )
                  | cancel
                v-btn( color="primary darken-3", flat, @click.native="onSave()" )
                  | save

</template>

<script>
  export default {
    name: 'MeetupDetailsEditTime',
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

