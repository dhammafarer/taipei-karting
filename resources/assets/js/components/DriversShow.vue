<template>
  <div class="Driver-Show">
    <div class="container">

      <div class="row">

        <button class="btn btn-default" @click="showEdit = true">Edit</button>
        <button class="btn btn-danger" @click="promptDelete = true">Delete</button>
        <div class="col-sm-1">
          <img class="Driver-photo img img-thumbnail" :src="driver.photo | driverPhoto">
        </div>
        <div class="col-sm-2">
          <h3>{{ driver.name }}</h3>
          <p>{{ driver.country }}</p>
        </div>
      </div>

      <div class="modal-delete" v-if="promptDelete">
        <div class="modal-mask">
          <div class="modal-container">
            <div class="panel panel-default">

              <div class="panel-heading">
                <h3 class="panel-title">
                  Delete Driver
                </h3>
              </div>

              <div class="panel-body">
                <p>Are you sure you want to delete this driver?</p>
                <button class="btn btn-primary" @click="removeDriver">Yes</button>
                <button class="btn btn-danger" @click="promptDelete = false">Cancel</button>
              </div>
            </div>
          </div>
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
  import { fetchCurrentDriver, clearCurrentDriver, deleteDriver } from '../vuex/drivers/actions'
  import DriversEdit from './DriversEdit.vue'

  export default {
    name: 'DriversIndex',
    components: {
      DriversEdit
    },
    vuex: {
      actions: {
        fetchCurrentDriver,
        clearCurrentDriver,
        deleteDriver
      },
      getters: {
        driver: getCurrentDriver
      }
    },
    data () {
      return {
        showEdit: false,
        promptDelete: false
      }
    },
    methods: {
      removeDriver () {
        this.deleteDriver(this.driver).then(this.$router.go({ name: 'drivers.index' }))
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
