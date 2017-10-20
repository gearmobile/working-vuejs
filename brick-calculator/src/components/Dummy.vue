<template lang="pug">
  v-layout.mb-4
    v-flex.mx-2( xs12, sm4 )
      v-text-field( name="width", id="width", label="Ширина проема, м", )
    v-flex.mx-2( xs12, sm4 )
      v-text-field( name="height", id="height", label="Длина проема, м", )
    v-flex.mx-2( xs12, sm4 )
      v-btn.primary( @click="onClick()" )
        | удалить
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'dummy',
    props: ['id'],
    methods: {
      ...mapActions({
        removeComponent: 'decreaseCounter'
      }),
      onClick () {
        this.removeComponent(this.id)
        // console.log(this.id)
      }
    }
  }
</script>
