<template>
  <div>
    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="Race">

      <races-edit-dropdown :menu.sync="menu"></races-edit-dropdown>

      <section v-if="$route.name === 'races.show'" class="Race__Cover">
        <div class="Race__Cover-photo" :style="{ backgroundImage: racePhoto }">
          <div class="Race__Mask">
            <div class="container">

              <div class="Race__Birthdays">
                <div class="Race__Birthday-driver" v-for="driver in birthdayDrivers">
                  <a href="#" v-link="{ name: 'drivers.show', params: { id: driver.id } }">
                    <span class="icon-birthday"></span>
                    <img :src="driver.photo | driverThumb" :alt="driver.name">
                  </a>
                </div>
              </div>

              <div class="Race__Edit">
                <button class="Btn Btn--reverse" @click="openMenu">Edit Race</button>
              </div>

              <div class="col-sm-6 Race__Details">

                <span class="Race__Name">{{ race.name }}</span>

                <div class="Race__Date">
                  <span class="icon-calendar">{{ race.date | monthDay | tba }}</span>
                  <span class="icon-clock">{{ race.time | tba }}</span>
                  <span class="icon-location">{{ race.venue | capitalize | tba }}</span>
                </div>

                <div v-if="race.circuit" class="Race__Circuit" :style="{ backgroundImage: 'url(/img/circuits/Circuit--default.svg)' }">
                  <span class="Race__Circuit-type">Track {{ race.circuit }}</span>
                </div>

              </div><!-- Race Details -->


            </div><!-- container -->

          </div><!-- Race__Mask -->
        </div><!-- Race__Cover-Photo -->
      </section>

      <div class="container">

        <div class="Race__Router">
          <router-view></router-view>
        </div>

        <section v-if="$route.name === 'races.show'">
          <race-overview></race-overview>
        </section>
      </div>
  </div>
</template>

<script>
  import RacesEditDropdown from './RacesEditDropdown.vue'
  import RacesDeleteModal from './RacesDeleteModal.vue'
  import RaceOverview from './RaceOverview.vue'
  import { setEditorView, updateCurrentRaceId, clearCurrentRaceId } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'
  import { getAllDrivers } from '../vuex/drivers/getters'

  export default {
    name: 'RacesShow',
    components: {
      RacesEditDropdown,
      RacesDeleteModal,
      RaceOverview
    },
    vuex: {
      actions: {
        updateCurrentRaceId,
        clearCurrentRaceId,
        setEditorView
      },
      getters:{
        race: getCurrentRace,
        drivers: getAllDrivers
      }
    },
    data () {
      return {
        menu: false
      }
    },
    computed: {
      racePhoto () {
        return 'url(' + this.$options.filters.racePhoto(this.race.photo) + ')'
      },
      birthdayDrivers () {
        let raceDate = new Date(this.race.date)
        let month = raceDate.getMonth() + 1
        let drivers = this.race.records.data.map(record => record.driver.data)
        return drivers.filter(driver => driver.month === month.toString())
      }
    },
    methods: {
      openMenu () {
        this.menu = true
        document.querySelector('html').style.overflow = 'hidden'
      }
    },
    beforeDestroy () {
      this.clearCurrentRaceId();
    },
    route: {
      data (transition) {
        this.updateCurrentRaceId(transition.to.params.id)
        transition.next()
      }
    }
  }
</script>
