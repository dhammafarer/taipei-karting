<template>
  <div class="Driver-Show">
    <div class="container">

      <div class="row">

        <button class="btn btn-default" v-link="{ name: 'drivers.edit', params: { id: driver.id } }">Edit</button>
        <div class="col-sm-2">
          <img class="Driver-photo img img-thumbnail" :src="driver.photo | driverPhoto">
        </div>
        <div class="col-sm-2">
          <h3>{{ driver.name }}</h3>
          <p>{{ driver.country }}</p>
        </div>
      </div>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
  import driver from '../api/driver'
  export default {
    name: 'DriversIndex',
    data () {
      return {
        driver: []
      }
    },
    route: {
      data (transition) {
        console.log('getting a driver')
        driver.fetch(transition.to.params.id).then(response => this.$set('driver', response.data))
      }
    }
  }
</script>
