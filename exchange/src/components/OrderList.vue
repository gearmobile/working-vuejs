<template lang="pug">
  section.list
    .order( v-for="(order, index) in orders", :key="index" )
      order-list-item( :order="order", :index="index" )
</template>

<script>
  import OrderListItem from './OrderListItem.vue'
  export default {
    name: 'OrderList',
    computed: {
      orders () {
        return this.$store.getters.getOrders
      }
    },
    components: {
      OrderListItem
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    background-color: #33cc66;
    padding: 1rem;
  }
</style>
