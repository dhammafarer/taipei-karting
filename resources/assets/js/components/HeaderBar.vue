<template>
  <nav class="Navigation">
    <div class="container">
      <ul class="Navigation__List">
        <li class="Navigation__List-item">
          <a class="Navigation__Link" href="#" v-link="{ name: 'home', exact: true }">
            <span class="Navigation__Icon icon-home" title="Home"></span>
            <span class="Navigation__Text">Home</span>
          </a>
        </li>
        <li class="Navigation__List-item">
          <a class="Navigation__Link" href="#" v-link="{ name: 'races.index' }">
            <span class="Navigation__Icon icon-gauge-1" title="Races"></span>
            <span class="Navigation__Text">Races</span>
          </a>
        </li>
        <li class="Navigation__List-item">
          <a class="Navigation__Link" href="#" v-link="{ name: 'drivers.index' }">
            <span class="Navigation__Icon icon-helmet" title="Drivers"></span>
            <span class="Navigation__Text">Drivers</span>
          </a>
        </li>
        <li class="Navigation__List-item" v-if="!user.authenticated">
          <a class="Navigation__Link" href="#" v-link="{ name: 'login' }">
            <span class="Navigation__Icon icon-login" title="Login"></span>
            <span class="Navigation__Text">Login</span>
          </a>
        </li>
        <li class="Navigation__List-item" v-if="user.authenticated">
          <a class="Navigation__Link" href="#" @click="logout">
            <span class="Navigation__Icon icon-logout" title="Logout"></span>
            <span class="Navigation__Text">Logout</span>
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
        user: auth.user
      }
    },
    methods: {
      logout () {
        auth.logout()
        this.$router.go('/')
      }
    }
  }
</script>
<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  body {
    margin-top: 50px !important;
  }

  .Navigation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid $mid-gray;
    margin-bottom: 0;
    background-color: $black;
    z-index: 99;
  }

  .Navigation__List {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }

  .Navigation__List-item {
    text-align: center;
    padding: 10px 0;
  }

  .Navigation__Link {
    color: $mid-gray;
    font-size: 1.4em;
    transition: color .3s ease;
    &:hover {
      color: white;
    }
  }

  .Navigation__Brand {
  }

  .Navigation__Icon {
  }

  .Navigation__Text {
    display: none;
  }

  .v-link-active {
    color: white !important;
  }
</style>
