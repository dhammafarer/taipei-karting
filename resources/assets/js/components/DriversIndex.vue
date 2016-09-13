<template>
  <div class="Drivers">
    <div class="container">
      <h3>All drivers
        <button class="btn btn-default" v-link="{ name: 'drivers.create' }">Create Driver</button>
      </h3>

      <div class="row">
        <router-view></router-view>
      </div>

      <div class="Driver col-sm-2" v-for="driver in drivers">
        <div class="thumbnail">
          <a v-link="{ name: 'drivers.show', params: { id: driver.id } }">
            <img class="Driver-photo"
            :src="driver.photo | driverPhoto"
            >
          </a>
          <div class="caption text-center">
            <h4>{{ driver.name }}</h4>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { getAllDrivers } from '../vuex/drivers/getters'
  export default {
    name: 'DriversIndex',
    vuex: {
      getters: {
        drivers: getAllDrivers
      }
    }
  }
</script>
