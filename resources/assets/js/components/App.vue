<template>
  <div id="root">
    <notifications></notifications>
    <header>
      <header-bar></header-bar>
    </header>
    <main v-if="!loading">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import HeaderBar from './HeaderBar.vue'
  import Notifications from './Notifications.vue'
  import { fetchAllRaces } from '../vuex/races/actions'
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
      this.fetchAllRaces().then(() => {
        this.closeNotification(notification)
        this.loading = false
      })
    }
  }
</script>

<style>
  html {
    overflow-y: scroll;
  }
</style>
