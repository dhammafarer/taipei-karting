<template>
  <div class="Driver-Show">

    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="container page">
      <div class="row">
        <div class="col-sm-10 col-sm-offset-1">

          <div class="row">
            <div class="col-sm-12">
              <driver-profile :driver="driver" :drivers="drivers" :races="races"></driver-profile>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <driver-history-graph :driver="driver" :drivers="drivers" :races="races"></driver-history-graph>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-12">
              <driver-history :driver="driver" :drivers="drivers" :races="races"></driver-history>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { updateCurrentDriverId, clearCurrentDriverId } from '../vuex/drivers/actions'
  import { getAllRaces } from '../vuex/races/getters'
  import { getCurrentDriver, getAllDrivers } from '../vuex/drivers/getters'
  import DriverProfile from './DriverProfile.vue'
  import DriverHistory from './DriverHistory.vue'
  import DriverHistoryGraph from './DriverHistoryGraph.vue'

  export default {
    name: 'DriversShow',
    components: {
      DriverProfile,
      DriverHistory,
      DriverHistoryGraph
    },
    vuex: {
      actions: {
        updateCurrentDriverId,
        clearCurrentDriverId
      },
      getters: {
        driver: getCurrentDriver,
        drivers: getAllDrivers,
        races: getAllRaces
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
