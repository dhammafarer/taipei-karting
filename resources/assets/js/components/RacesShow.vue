<template>
  <div>
    <div v-if="$loadingRouteData">Loading...</div>

    <div v-else class="Race">

      <section class="Race__cover">
        <div class="Race__cover-photo" :style="{ backgroundImage: racePhoto }">
          <div class="Race__mask">
            <div class="container">
              <div >
                <div class="col-sm-3 Race__Birthdays">
                  <span>Birthday Month Of:</span>
                </div>
                <div class="col-sm-6 Race__Details">
                  <span class="Race__Name">{{ race.name }}</span>
                  <span>April 17, Zhongli</span>
                  <img class="Race__Circuit"src="/img/races/race--default.png" alt="">
                </div>
                <div class="col-sm-3 Race__Edit">
                  <races-edit-dropdown class="pull-right"></races-edit-dropdown>
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
  .Race__cover-photo {
    height: calc(100vh - 50px);
    background-position: top center;
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-size: cover;
    background-color: #999;
    z-index: 1;
  }
  .Race__mask {
    background-color: rgba(0,0,0,.5);
    height: calc(100vh - 50px);
  }

  .Race__Details {
    height: calc(100vh - 50px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    color: white;
  }

  .Race__Name {
    color: white;
    font-size: 4em;
    font-family: $title-font;
    line-height: 1em;
  }

  .Race__Circuit {
    height: 150px;
  }
</style>
