<template>
  <div id="root">
    <notifications></notifications>
    <header>
      <header-bar></header-bar>
    </header>
    <main v-if="!loading">
      <router-view transition-mode="out-in" transition="slideInOut"></router-view>
    </main>
  </div>
</template>

<script>
  import io from 'socket.io-client'
  import auth from '../auth'
  import store from '../vuex/store'
  import HeaderBar from './HeaderBar.vue'
  import Notifications from './Notifications.vue'
  import { fetchAllRaces, socketRaceUpdated } from '../vuex/races/actions'
  import { fetchAllDrivers } from '../vuex/drivers/actions'
  import { addNotification, closeNotification } from '../vuex/notifications/actions'

  export default {
    store: store,
    components: {
      HeaderBar,
      Notifications
    },
    vuex: {
      actions: {
        fetchAllRaces,
        socketRaceUpdated,
        fetchAllDrivers,
        addNotification,
        closeNotification
      }
    },
    data () {
      return {
        loading: false
      }
    },
    created () {
      let notification = { title: 'Loading', body: '', type: 'loading' }
      this.addNotification(notification)
      this.loading = true
      Promise.all([this.fetchAllRaces(), this.fetchAllDrivers()])
        .then(() => {
          this.closeNotification(notification)
          this.loading = false
        })
    },
    ready () {
      let socket = io('http://192.168.10.10:5000')
      socket.on('races-channel:App\\Events\\RaceUpdated', (data) => {
        this.socketRaceUpdated(data)
      })

      auth.checkAuth()
    }
  }
</script>

<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  html {
    overflow-y: scroll;
  }

  body {
    font-family: $body-font;
    background-color: $body-color;
  }
</style>
