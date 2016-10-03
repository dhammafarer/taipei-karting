<template>
  <nav class="Navigation">
    <div class="Navigation__Banner">
      <div class="container">Taipei Karting
      </div>
    </div>
    <div class="container">
      <ul class="Navigation__List">
        <li v-link="{ name: 'home', exact: true }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-home" title="Home"></span>
            <span class="Navigation__Text hidden-xs">Home</span>
          </a>
        </li>
        <li v-link="{ name: 'races.index' }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-gauge" title="Races"></span>
            <span class="Navigation__Text hidden-xs">Races</span>
          </a>
        </li>
        <li v-link="{ name: 'drivers.index' }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-helmet" title="Drivers"></span>
            <span class="Navigation__Text hidden-xs">Drivers</span>
          </a>
        </li>
        <li v-link="{ name: 'login' }" class="Navigation__List-item" v-if="!user.authenticated">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-login" title="Login"></span>
            <span class="Navigation__Text hidden-xs">Login</span>
          </a>
        </li>
        <li @click="logout" class="Navigation__List-item" v-if="user.authenticated">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-logout" title="Logout"></span>
            <span class="Navigation__Text hidden-xs">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import auth from '../auth'

  export default {
    data () {
      return {
        user: auth.user,
        scrollTop: ''
      }
    },
    methods: {
      logout () {
        auth.logout()
        this.$router.go('/')
      }
    },
    ready () {
      let navList = document.querySelector('.Navigation__List')
      window.addEventListener('scroll', function(e) {
        if (window.pageYOffset > 50) navList.classList.add('Navigation__List--fixed')
        else navList.classList.remove('Navigation__List--fixed')
      })
    }
  }
</script>
