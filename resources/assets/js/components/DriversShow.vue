<template>
  <div class="Driver-Show">


    <div class="container page">

      <div class="row">
        <div class="col-sm-9">
          <driver-profile :driver="driver"></driver-profile>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-9">
          <driver-history :driver="driver"></driver-profile>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { getCurrentDriver } from '../vuex/drivers/getters'
  import { updateCurrentDriverId, clearCurrentDriverId } from '../vuex/drivers/actions'
  import DriverProfile from './DriverProfile.vue'
  import DriverHistory from './DriverHistory.vue'

  export default {
    name: 'DriversShow',
    components: {
      DriverProfile,
      DriverHistory
    },
    vuex: {
      actions: {
        updateCurrentDriverId,
        clearCurrentDriverId
      },
      getters: {
        driver: getCurrentDriver
      }
    },
    beforeDestroy () {
      this.clearCurrentDriverId()
    },
    route: {
      data (transition) {
        this.updateCurrentDriverId(transition.to.params.id)
        transition.next()
      }
    }
  }
</script>
