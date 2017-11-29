<template lang="pug">
  #app
    .container
      .grid
        .col-12
          create-order
      .grid
        .col-12
          order-list
</template>

<script>
  import CreateOrder from '@/components/CreateOrder.vue'
  import OrderList from '@/components/OrderList.vue'
  export default {
    name: 'app',
    components: {
      CreateOrder,
      OrderList
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'PT Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #cccc99;
    padding: 2rem;

    & input {
      box-sizing: border-box;
      width: 100%;
      padding: .6rem;
      font-size: 1rem;
      font-family: 'PT Mono', monospace;
    }

    & button {
      width: 100%;
      cursor: pointer;
      padding: .6rem 0;
      border: none;
      background-color: #fff;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
</style>
