<template>
  <div class="Driver-Profile">

    <div class="Panel">
      <div class="Panel__Heading">
        <div class="Panel__Title">
          Driver Details
          <button v-if="user.authenticated" class="Btn" @click="showEdit = true">Edit</button>
        </div>
      </div>

      <div class="Panel__Body">
        <div class="Media">
          <img class="Media__Figure Driver-Profile__Photo img" :src="driver.photo | driverPhoto">
          <div class="Media__Body">
            <table class="table borderless">
              <tr>
                <td class="small">Name</td>
                <td>{{ driver.name }}</td>
              </tr>
              <tr>
                <td class="small">Country</td>
                <td><img :src="driver.country | countryFlag"></td>
              </tr>
              <tr>
                <td class="small">Standing</td>
                <td> #{{ standing }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div><!-- Panel -->

    <div v-if="showEdit">
      <drivers-edit :show.sync="showEdit" :driver="driver"></drivers-edit>
    </div>

    <drivers-delete-modal></drivers-delete-modal>
    <drivers-edit-modal></drivers-edit-modal>

  </div>
</template>

<script>
  import auth from '../auth'
  import rules from '../utilities/race-rules'
  import { getAllRaces } from '../vuex/races/getters'
  import { getAllDrivers } from '../vuex/drivers/getters'
  import DriversEdit from './DriversEdit.vue'
  import DriversEditModal from './DriversEditModal.vue'
  import DriversDeleteModal from './DriversDeleteModal.vue'

  export default {
    components: {
      DriversEdit,
      DriversEditModal,
      DriversDeleteModal
    },
    props: ['driver', 'drivers', 'races'],
    data () {
      return {
        showEdit: false,
        user: auth.user
      }
    },
    computed: {
      standing () {
        return rules.getDriverStanding(this.driver.id, this.drivers, this.races)
      },
      history () {
        return rules.getDriverHistory(driver.id, this.races)
      }
    }
  }
</script>
