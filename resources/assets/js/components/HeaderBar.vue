<template>
  <nav class="Navigation">
    <div class="Navigation__Banner">
      <div class="container">TIKA
      </div>
    </div>
    <div class="container">
      <ul class="Navigation__List">
        <li v-link="{ name: 'home', exact: true }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-home" title="Home"></span>
            <span class="Navigation__Text">Home</span>
          </a>
        </li>
        <li v-link="{ name: 'races.index' }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-gauge" title="Races"></span>
            <span class="Navigation__Text">Races</span>
          </a>
        </li>
        <li v-link="{ name: 'drivers.index' }" class="Navigation__List-item">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-helmet" title="Drivers"></span>
            <span class="Navigation__Text">Drivers</span>
          </a>
        </li>
        <li v-link="{ name: 'login' }" class="Navigation__List-item" v-if="!user.authenticated">
          <a class="Navigation__Link" href="#">
            <span class="Navigation__Icon icon-login" title="Login"></span>
            <span class="Navigation__Text">Login</span>
          </a>
        </li>
        <li @click="logout" class="Navigation__List-item" v-if="user.authenticated">
          <a class="Navigation__Link" href="#">
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
        user: auth.user,
        scrollTop: ''
      }
    },
    computed: {
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
        if (window.pageYOffset > 50) console.log('Hi')
        if (window.pageYOffset > 50) navList.classList.add('Navigation__List--fixed')
        else navList.classList.remove('Navigation__List--fixed')
      })
    }
  }
</script>
<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  main {
    padding-top: 40px;
  }

  .Navigation {
    position: relative;
    width: 100%;
    margin-bottom: 0;
    z-index: 99;
  }

  .Navigation__Banner {
    padding: 10px;
    height: 50px;
    text-align: center;
    font-size: 20px;
    letter-spacing: 3px;
    color: white;
    background-color: $primary-color;
  }

  .Navigation__List {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: lighten($primary-color, 5%);
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-around;
    box-shadow: 0px 2px 2px #666;
  }

  .Navigation__List--fixed {
    position: fixed;
    top: 0;
    left: 0;
  }

  .Navigation__List-item {
    padding: 5px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    color: lighten($primary-color, 20%);
    transition: all .3s ease;
    &.v-link-active {
      border-bottom: 3px solid white;
    }
    &:hover .Navigation__Link {
      color: white;
    }
    &:hover .Navigation__Icon, &.v-link-active .Navigation__Icon {
      color: white;
    }
  }

  .Navigation__Link {
    font-size: 1.4em;
  }

  .Navigation__Brand {
  }

  .Navigation__Icon {
    color: lighten($primary-color, 20%);
  }

  .Navigation__Text {
    display: none;
  }
</style>
