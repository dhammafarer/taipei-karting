<template>
  <div>
    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="Race">

      <section class="Race__Cover">
        <div class="Race__Cover-photo" :style="{ backgroundImage: racePhoto }">
          <div class="Race__Mask">
            <div class="container">

              <div class="Race__Edit">
                <races-edit-dropdown></races-edit-dropdown>
              </div>

              <div class="col-sm-6 Race__Details">

                <span class="Race__Name">{{ race.name }}</span>

                <div class="Race__Date">
                  <span>{{ race.date }}</span>
                  <span>{{ race.venue }}</span>
                </div>

                <img class="Race__Circuit"src="/img/circuits/Circuit--default.svg" alt="">

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

<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

  .Race {
    position: relative;
  }

  .Race__Cover-photo {
    background-position: top center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    background-color: #999;
    z-index: 1;
  }
  .Race__Mask {
    background-color: rgba(0,0,0,.3);
  }

  .Race__Details {
    padding: 70px 0 20px 0;
    text-align: center;
    color: white;
  }

  .Race__Name {
    color: white;
    text-align: center;
    font-size: 4em;
    font-family: $title-font;
    line-height: 1em;
  }

  .Race__Circuit {
    height: 150px;
  }

  .Race__Edit {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 333;
  }
</style>
