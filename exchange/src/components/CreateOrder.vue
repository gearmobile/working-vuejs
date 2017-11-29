<template lang="pug">
  section.create
    h2.create__title
    .grid
      .col-12
        label( for="summ" )
          | enter sum
        input( type="text" name="summ" id="summ", v-mask="mask", v-model.trim="summ", required )
    .grid
      .col-12
        label( for="price" )
          | enter price
        input( type="text" name="price" id="price", v-mask="mask", v-model.trim="price", required )
    .grid
      .col-12
        button( type="button", name="buy", id="buy", @click="onBuy()" )
          | buy
</template>

<script>
  import { mask } from 'vue-the-mask'
  export default {
    name: 'CreateOrder',
    data () {
      return {
        summ: null
      }
    },
    methods: {
      onClear () {
        this.summ = null
      },
      onBuy () {
        this.$store.dispatch('onBuy', this.summ)
        this.onClear()
      }
    },
    directives: {
      mask
    },
    computed: {
      price: {
        get () { return this.$store.getters.getLastPrice },
        set (value) { this.$store.dispatch('setLastPrice', value) }
      },
      mask () {
        return this.$store.getters.getMask
      }
    }
  }
</script>

<style lang="scss" scoped>
  .create {
    background-color: #66cc66;
    padding: 1rem;
    margin-bottom: 1rem;
  }
</style>
