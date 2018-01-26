<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="name">name</label>
          <input class="form-control" type="text" name="name" id="name" v-model="name">
        </div>
        <div class="form-group">
          <label for="phone">phone</label>
          <input class="form-control" type="text" name="phone" id="phone" v-model="phone">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        name: '',
        phone: ''
      }
    },
    beforeCreate () {
      console.log(`before create hook`)
      console.log(this.$el)
    },
    created () {
      console.log(`created hook`)
      console.log(this.$el)
    },
    beforeMount () {
      console.log(`before mount hook`)
      console.log(this.$el)
      // console.log(this.$el.innerHTML)
    },
    mounted () {
      console.log(`mounted hook`)
      console.log(this.$el)
      console.log(this.$el.innerHTML)
    },
    beforeUpdate () {
      console.log(`before update`)
      const pattern = /^[0-9]*$/
      const sample = /[^0-9]/g
      if (!pattern.test(this.phone)) {
        this.phone = this.phone.replace(sample, '')
        console.log(this.phone)
      }
    },
    updated () {
      console.log(`updated`)
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
