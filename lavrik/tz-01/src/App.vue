<template>
  <div class="container my-4">
    <div class="row" v-show="!show">
      <div class="col">
        <form @submit.prevent="onSend">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" v-model.trim.lazy="user.email">
          </div>
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" class="form-control" id="firstName" placeholder="First Name" v-model.trim.lazy="user.firstName">
          </div>
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" class="form-control" id="lastName" placeholder="Last Name" v-model.trim.lazy="user.lastName">
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" placeholder="Phone" v-model.trim.lazy="user.phone">
          </div>
          <button type="button" class="btn btn-primary" @click="onAddGuest">Add Guests</button>
          <hr>
          <div class="form-group" v-for="(guest, index) in guests" :key="index">
            <label for="guest" @click="onRemove(index)" style="cursor: pointer">Guest {{ index + 1 }}</label>
            <input type="text" class="form-control" id="guest" placeholder="Guest">
          </div>
          <button type="submit" class="btn btn-success">Send Data</button>
        </form>
        <!-- display data -->
        <div class="row" v-show="show">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Guests</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ user.email }}</td>
                  <td>{{ `${user.firstName} ${user.lastName}` }}</td>
                  <td>{{ user.phone }}</td>
                  <td>
                    <tr v-for="(guest, index) in guests" :key="index">
                      <td>{{ guest }}</td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
        user: {
          email: '',
          firstName: '',
          lastName: '',
          phone: ''
        },
        guests: [],
        show: false
      }
    },
    methods: {
      onAddGuest () {
        const value = this.guests[this.guests.length - 1] === undefined ? 0 : this.guests[this.guests.length - 1]
        console.log(value)
        this.guests.push(value + 1)
      },
      onRemove (index) {
        this.guests.splice(index, 1)
      },
      onSend () {
        if (this.user.email !== '' && this.user.firstName !== '' && this.user.lastName !== '' && this.user.phone !== '') {
          this.show = !this.show
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
