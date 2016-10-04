<template>
  <div>
    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="Race">

      <div @click="prevRace" class="Race__Prev">
        <span>&lt</span>
      </div>
      <div @click="nextRace" class="Race__Next">
        <span>&gt</span>
      </div>

      <races-edit-dropdown :menu.sync="menu"></races-edit-dropdown>

      <section v-if="$route.name === 'races.show'" class="Race__Cover">

        <div class="Race__Cover-photo"
          :style="{ backgroundImage: full === true ? racePhoto : raceThumb }"
          :class="{ 'blur': !full }"
        >
        </div>
        <img @load="full = true" style="display: none" :src="race.photo | racePhoto">

        <div class="Race__Mask">

          <div class="Race__Toolbar">
            <div class="Race__Birthdays" v-if="birthdayDrivers.length > 0">
              <div class="Race__Birthday-driver" v-for="driver in birthdayDrivers">
                <a href="#" v-link="{ name: 'drivers.show', params: { id: driver.id } }">
                  <span class="icon-birthday"></span>
                  <img :src="driver.photo | driverThumb" :alt="driver.name">
                </a>
              </div>
            </div>

            <div class="Race__Edit" v-if="user.authenticated">
              <button class="Btn Btn--reverse" @click="openMenu">Edit Race</button>
            </div>
          </div>

          <div class="Race__Details">

            <span class="Race__Name">{{ race.name }}</span>

            <div class="Race__Date">
              <span class="icon-calendar">{{ race.date | monthDay | tba }}</span>
              <span class="icon-clock">{{ race.time | tba }}</span>
              <span class="icon-location">{{ race.venue | capitalize | tba }}</span>
            </div>

          </div><!-- Race Details -->

          <div class="Race__Circuit" v-if="race.circuit">
            <div class="Race__Circuit-photo" :style="{ backgroundImage: circuitPhoto }">
              <span class="Race__Circuit-type">Track {{ race.circuit }}</span>
            </div>
          </div>

        </div><!-- Race__Mask -->
      </section>

      <div class="container">

        <div class="row">
          <div class="col-sm-10 col-sm-offset-1">
            <div class="Race__Router">
              <router-view></router-view>
            </div>

            <section v-if="$route.name === 'races.show'">
              <race-overview></race-overview>
            </section>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import auth from '../auth'
  import R from 'ramda'
  import RacesEditDropdown from './RacesEditDropdown.vue'
  import RacesDeleteModal from './RacesDeleteModal.vue'
  import RaceOverview from './RaceOverview.vue'
  import { setEditorView, updateCurrentRaceId, clearCurrentRaceId } from '../vuex/races/actions'
  import { getCurrentRace, getAllRaces } from '../vuex/races/getters'
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
        races: getAllRaces,
        drivers: getAllDrivers
      }
    },
    data () {
      return {
        user: auth.user,
        full: false,
        menu: false
      }
    },
    computed: {
      racePhoto () {
        return 'url(' + this.$options.filters.racePhoto(this.race.photo) + ')'
      },
      raceThumb () {
        return 'url(' + this.$options.filters.raceThumb(this.race.photo) + ')'
      },
      circuitPhoto () {
        return 'url(' + this.$options.filters.circuitPhoto(this.race.circuit) + ')'
      },
      birthdayDrivers () {
        let raceDate = new Date(this.race.date)
        let month = raceDate.getMonth() + 1
        let drivers = this.race.records.data.map(record => record.driver.data)
        return drivers.filter(driver => driver.month === month.toString())
      },
      currentIndex () {
        return R.findIndex(R.propEq('id', this.race.id))(this.races)
      },
      prevIndex () {
        let index = this.currentIndex
        return index - 1 >= 0 ? index - 1 : index
      },
      nextIndex () {
        let index = this.currentIndex
        return index + 1 < this.races.length ? index + 1 : index
      }
    },
    methods: {
      openMenu () {
        this.menu = true
        document.querySelector('html').style.overflow = 'hidden'
      },
      prevRace () {
        let id = this.races[this.prevIndex].id
        return this.$router.go({name: 'races.show', params:{id: id} })
      },
      nextRace () {
        let id = this.races[this.nextIndex].id
        return this.$router.go({name: 'races.show', params:{id: id} })
      }
    },
    beforeDestroy () {
      this.clearCurrentRaceId();
    },
    route: {
      data (transition) {
        this.updateCurrentRaceId(transition.to.params.id)
        transition.next()
      },
      canReuse: false
    }
  }
</script>
