<template>
  <div id="root">
    <header>
      <header-bar></header-bar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import store from '../vuex/store'
  import HeaderBar from './HeaderBar.vue'

  export default {
    store: store,
    components: {
      HeaderBar
    }
  }
</script>

<style>
</style>
