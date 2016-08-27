<template>
  <my-modal>
    <button class="btn btn-danger" slot="trigger">Test</button>

    <span slot="title">Delete Race</span>

    <p slot="body">Are you sure you want to permanently delete <strong>{{ race.name }}</strong>?</p>

    <button slot="ok" class="btn btn-danger" @click="removeRace">Yes</button>
    <button slot="cancel" class="btn btn-default">Cancel</button>
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
