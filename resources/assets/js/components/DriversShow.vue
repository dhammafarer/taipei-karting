<template>
  <div class="Driver-Show">
    <div class="container">

      <div class="row">

        <button class="btn btn-default" @click="showEdit = true">Edit</button>
        <div class="col-sm-1">
          <img class="Driver-photo img img-thumbnail" :src="driver.photo | driverPhoto">
        </div>
        <div class="col-sm-2">
          <h3>{{ driver.name }}</h3>
          <p>{{ driver.country }}</p>
        </div>
      </div>

      <router-view></router-view>

      <div v-if="showEdit">
        <drivers-edit :show.sync="showEdit" :driver.sync="driver"></drivers-edit>
      </div>

    </div>
  </div>
</template>

<script>
  import { getCurrentDriver } from '../vuex/drivers/getters'
  import { fetchCurrentDriver } from '../vuex/drivers/actions'
  import DriversEdit from './DriversEdit.vue'

  export default {
    name: 'DriversIndex',
    components: {
      DriversEdit
    },
    vuex: {
      actions: {
        fetchCurrentDriver
      },
      getters: {
        driver: getCurrentDriver
      }
    },
    data () {
      return {
        showEdit: false
      }
    },
    route: {
      data (transition) {
        this.fetchCurrentDriver(transition.to.params.id)
      }
    }
  }
</script>
