<template>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container">
      <div class="navbar-header">
        <a href="#" v-link="{ name: 'home' }" class="navbar-brand">TIKA</a>
      </div>
      <div class="navbar-collapse collapsed">
        <ul class="nav navbar-nav">
          <li><a href="#" v-link="{ name: 'home' }">Home</a></li>
          <li><a href="#" v-link="{ name: 'races.index' }">Races</a></li>
          <li><a href="#" v-link="{ name: 'drivers.index' }">Drivers</a></li>
          <li><a href="#" v-link="{ name: 'login' }" v-if="!user.authenticated">Login</a></li>
          <li><a href="#" v-link="{ name: 'home' }" @click="logout" v-if="user.authenticated">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import auth from '../auth'

  export default {
    data () {
      return {
        user: auth.user
      }
    },
    methods: {
      logout () {
        auth.logout()
      }
    }
  }
</script>
<style>
  .navbar {
    margin-bottom: 0;
  }
</style>
