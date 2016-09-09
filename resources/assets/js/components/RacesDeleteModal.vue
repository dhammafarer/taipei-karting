<template>
  <div>
    <button class="Btn Btn--danger" @click="modal = true">Delete Race</button>
    <my-modal :show="modal">
      <span slot="title">Delete Race</span>

      <p slot="body">Are you sure you want to permanently delete <strong>{{ race.name }}</strong>?</p>

      <span slot="footer">
        <button class="btn btn-danger" @click="removeRace">Yes</button>
        <button class="btn btn-default" @click="modal = false">Cancel</button>
      </span>
    </my-modal>
  </div>
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
    data () {
      return {
        modal: false
      }
    },
    methods: {
      removeRace () {
        this.deleteRace(this.race).then(this.$router.go({ name: 'races.index' }))
      }
    }
  }
</script>
