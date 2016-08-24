<template>
  <div id="root">
    <notifications></notifications>
    <header>
      <header-bar></header-bar>
    </header>
    <div v-if="loading">Loading</div>
    <main v-else>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import HeaderBar from './HeaderBar.vue'
  import Notifications from './Notifications.vue'
  import { fetchAllRaces } from '../vuex/races/actions'

  export default {
    store: store,
    components: {
      HeaderBar,
      Notifications
    },
    vuex: {
      actions: {
        fetchAllRaces
      }
    },
    data () {
      return {
        loading: false
      }
    },
    created () {
      this.loading = true
      this.fetchAllRaces().then(() => this.loading = false)
    }
  }
</script>

<style>
</style>
