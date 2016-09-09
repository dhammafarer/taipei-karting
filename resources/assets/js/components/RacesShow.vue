<template>
  <div>
    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="Race">

      <races-edit-dropdown :menu.sync="menu"></races-edit-dropdown>

      <section v-if="$route.name === 'races.show'" class="Race__Cover">
        <div class="Race__Cover-photo" :style="{ backgroundImage: racePhoto }">
          <div class="Race__Mask">
            <div class="container">

              <div class="Race__Edit">
                <button class="Btn Btn--reverse" @click="menu = true">Edit Race</button>
              </div>

              <div class="col-sm-6 Race__Details">

                <span class="Race__Name">{{ race.name }}</span>

                <div class="Race__Date">
                  <span class="icon-calendar">{{ race.date | monthDay }}</span>
                  <span class="icon-clock">{{ race.time }}</span>
                  <span class="icon-location">{{ race.venue | capitalize }}</span>
                </div>

                <div v-if="race.circuit" class="Race__Circuit">
                  <img class="Race__Circuit-map" src="/img/circuits/Circuit--default.svg" alt="">
                  <span class="Race__Circuit-type">{{ race.circuit }}</span>
                </div>

              </div>


            </div>
          </div>
        </div>
      </section>

      <div class="container">

        <button class="pull-right btn btn-sm btn-default"
          v-show="$route.name === 'races.edit'"
          v-link="{ name: 'races.show', params: {id: race.id} }"
          >
          Back to Race
        </button>

        <router-view></router-view>

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
  import { setEditorView, fetchCurrentRace, updateCurrentRaceId } from '../vuex/races/actions'
  import { getCurrentRace } from '../vuex/races/getters'

  export default {
    name: 'RacesShow',
    components: {
      RacesEditDropdown,
      RacesDeleteModal,
      RaceOverview
    },
    vuex: {
      actions: {
        fetchCurrentRace,
        updateCurrentRaceId,
        setEditorView
      },
      getters:{
        race: getCurrentRace
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
      }
    },
    route: {
      data (transition) {
        this.updateCurrentRaceId(transition.to.params.id)
        transition.next()
      }
    }
  }
</script>
