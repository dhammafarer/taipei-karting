<template>
  <div class="Drivers">
    <div class="container page">

      <section class="Races__Banner">

        <div class="Races__Toolbar">
          <div class="Races__Title">Drivers</div>
          <div class="Races__Buttons">
            <button class="Btn Btn--large" :class="{ 'Btn--active': search }" @click="search = !search">
              <span class="icon-search"></span>
            </button>
            <button class="Btn Btn--large" :class="{ 'Btn--active': $route.name === 'drivers.create' }"
              v-link="linkCreate"
              v-if="user.authenticated"
              >
              <span class="icon-plus"></span>
            </button>
          </div>
        </div>

        <div class="Races__Search Floated-form" v-show="search">
          <label transition="floatUp" v-show="searchString">Search Name</label>
          <input type="text" class="form-field" placeholder="Search Name"
            :class="{'has-input': searchString}"
            v-model="searchString"
          >
        </div>
      </section>

      <router-view transition transition-mode="out-in" class="view"></router-view>

      <div v-for="driver in filteredDrivers" class="col-sm-6 col-lg-4">
        <div class="Media Driver-Card Driver-Card--selectable"
          v-link="{ name: 'drivers.show', params: { id: driver.id } }"
          >
          <img class="Media__Figure Driver-Card__Photo" :src="driver.photo | driverPhoto">
          <div class="Media__Body Driver-Card__Info">
            <h4>{{ driver.name }}</h4>
            <img :src="driver.country | countryFlag" :alt="driver.country">
          </div>
        </div>
      </div>

      <div v-if="filteredDrivers.length === 0">No races match these criteria.</div>

    </div>

  </div>
</template>

<script>
  import auth from '../auth'
  import { getAllDrivers } from '../vuex/drivers/getters'
  export default {
    name: 'DriversIndex',
    vuex: {
      getters: {
        drivers: getAllDrivers
      }
    },
    data () {
      return {
        user: auth.user,
        search: false,
        searchString: ''
      }
    },
    computed: {
      filteredDrivers () {
        return this.drivers
          .filter(driver => driver.name.toLowerCase().indexOf(this.searchString.trim().toLowerCase()) > -1)
          .sort((a,b) => a.name > b.name ? 1 : -1)
      },
      linkCreate () {
        let linkTo = this.$route.name === 'drivers.create' ? 'drivers.index' : 'drivers.create'

        return { name: linkTo }
      }
    },
  }
</script>
