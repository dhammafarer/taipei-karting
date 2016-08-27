<template>
  <my-modal>
    <div class="panel panel-default">

      <div class="panel-heading">
        <h3 class="panel-title">
          Delete Race
        </h3>
      </div>

      <div class="panel-body">
        <p>Are you sure you want to delete this race?</p>
        <button class="btn btn-primary" @click="removeRace">Yes</button>
        <button class="btn btn-danger" @click="modal = false">Cancel</button>
      </div>
    </div>
  </my-modal>
</template>

<script>
  import MyModal from './Modal.vue'
  import { getCurrentRace } from '../vuex/races/getters'
  import { deleteRace } from '../vuex/races/actions'

  export default {
    components: {
      MyModal
    },
    vuex: {
      actions: {
        deleteRace
      },
      getters: {
        race: getCurrentRace
      }
    },
    methods: {
      removeRace () {
        this.deleteRace(this.race).then(this.$router.go({ name: 'races.index' }))
      }
    }
  }
</script>
