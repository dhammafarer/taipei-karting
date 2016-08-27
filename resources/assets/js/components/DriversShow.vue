<template>
  <div class="Driver-Show">
    <div class="container">

      <div class="row">

        <button class="btn btn-default" @click="showEdit = true">Edit</button>
        <drivers-delete-modal></drivers-delete-modal>
        <drivers-edit-modal></drivers-edit-modal>

        <div class="col-sm-1">
          <img class="Driver-photo img img-thumbnail" :src="driver.photo | driverPhoto">
        </div>
        <div class="col-sm-2">
          <h3>{{ driver.name }}</h3>
          <p>{{ driver.country }}</p>
        </div>
      </div>

      <div v-if="showEdit">
        <drivers-edit :show.sync="showEdit" :driver.sync="driver"></drivers-edit>
      </div>

    </div>
  </div>
</template>

<script>
  import { getCurrentDriver } from '../vuex/drivers/getters'
  import { fetchCurrentDriver, clearCurrentDriver } from '../vuex/drivers/actions'
  import DriversEdit from './DriversEdit.vue'
  import DriversEditModal from './DriversEditModal.vue'
  import DriversDeleteModal from './DriversDeleteModal.vue'

  export default {
    name: 'DriversIndex',
    components: {
      DriversEdit,
      DriversEditModal,
      DriversDeleteModal
    },
    vuex: {
      actions: {
        fetchCurrentDriver,
        clearCurrentDriver
      },
      getters: {
        driver: getCurrentDriver
      }
    },
    data () {
      return {
        showEdit: false,
      }
    },
    beforeDestroy () {
      this.clearCurrentDriver()
    },
    route: {
      data (transition) {
        this.fetchCurrentDriver(transition.to.params.id)
      }
    }
  }
</script>
