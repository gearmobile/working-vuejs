<template lang="pug">
  v-layout.mb-4
    v-flex.mx-2( xs12, sm4 )
      v-text-field( name="width", id="width", label="Ширина проема, м", :mask="mask", hint="Не более девяти цифр", persistent-hint, :counter="9" )
    v-flex.mx-2( xs12, sm4 )
      v-text-field( name="height", id="height", label="Длина проема, м", :mask="mask", hint="Не более девяти цифр", persistent-hint, :counter="9" )
    v-flex.mx-2( xs12, sm4 )
      v-btn.primary( @click="onClick()" )
        | удалить {{ id }}
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'dummy',
    props: ['id'],
    computed: {
      ...mapGetters({
        mask: 'getMask'
      })
    },
    methods: {
      ...mapActions({
        removeComponent: 'decreaseCounter'
      }),
      onClick () {
        this.removeComponent(this.id)
      }
    }
  }
</script>
