<template>
  <div class="Drivers">
    <div class="container">
      <h3>All drivers
        <button class="btn btn-default" v-link="{ name: 'drivers.create' }">Create Driver</button>
      </h3>

      <div class="row">
        <router-view></router-view>
      </div>

      <div v-for="driver in drivers" class="Media Driver-Card Driver-Card--selectable"
        v-link="{ name: 'drivers.show', params: { id: driver.id } }"
      >
        <img class="Media__Figure Driver-Card__Photo" :src="driver.photo | driverPhoto">
        <div class="Media__Body Driver-Card__Info">
          <h4>{{ driver.name }}</h4>
          <img :src="driver.country | countryFlag" :alt="driver.country">
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
