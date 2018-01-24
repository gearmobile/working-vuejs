<template>
  <div class="container my-4">
    <div class="row">
      <div class="col">

        <!-- INPUT FORM -->
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
            <label :for="'guest-' + (index + 1)" @dblclick="onRemove(index)" style="cursor: pointer">Guest {{ index + 1 }}</label>
            <input :id="'guest-' + (index + 1)" type="text" class="form-control" placeholder="Guest" v-model.trim.lazy="guest.name">
          </div>
          <button type="submit" class="btn btn-success">Send Data</button>
        </form>

        <!-- DISPLAY DATA -->
        <table class="table" v-show="show">
          <h2>Our user and guests</h2>
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
                <ul class="list-group">
                  <li class="list-group-item" v-for="guest in guests" :key="guest.name">
                    {{ guest.name }}
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <button class="btn btn-info" @click="onBack">Back to Home</button>
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
          email: null,
          firstName: null,
          lastName: null,
          phone: null
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
        if (this.user.email !== null && this.user.firstName !== null && this.user.lastName !== null && this.user.phone !== null) {
          this.show = !this.show
        } else {
          alert('From fields are empty!')
        }
      },
      onBack () {
        for (const key in this.user) {
          if (this.user.hasOwnProperty(key)) {
            this.user[key] = null

          }
        }
        this.guests = null
        this.show = !this.show
      }
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
