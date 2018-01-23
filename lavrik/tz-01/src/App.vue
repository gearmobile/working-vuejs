<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">

        <!-- input form -->
        <form @submit.prevent="onSend" v-if="!show">
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
          <div class="form-group" v-for="(guest, index) in guests" :key="guest.name">
            <label for="guest" @click="onRemove(index)" style="cursor: pointer">Guest {{ index + 1 }}</label>
            <input type="text" class="form-control" id="guest" placeholder="Guest" v-model="guest.name">
          </div>
          <button type="submit" class="btn btn-success">Send Data</button>
        </form>

        <!-- display data -->
        <table class="table" v-show="show">
          <tbody>
            <tr>
              <td>Email</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{{ `${user.firstName} ${user.lastName}` }}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{{ user.phone }}</td>
            </tr>
            <tr>
              <td>Guests</td>
              <td>
                <tr v-for="guest in guests" :key="guest.name">
                  <td>{{ guest.name }}</td>
                </tr>
              </td>
            </tr>
          </tbody>
        </table>

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
        this.guests.push({ name: '' })
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
