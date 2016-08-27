<template>
  <my-modal>
    <button class="btn btn-danger" slot="trigger">Delete Driver</button>

    <span slot="title">Delete Driver</span>

    <p slot="body">Are you sure you want to permanently delete <strong>{{ driver.name }}</strong>?</p>

    <button slot="ok" class="btn btn-danger" @click="removeDriver">Yes</button>
    <button slot="cancel" class="btn btn-default">Cancel</button>
  </my-modal>
</template>

<script>
  import MyModal from './Modal.vue'
  import { getCurrentDriver } from '../vuex/drivers/getters'
  import { deleteDriver } from '../vuex/drivers/actions'

  export default {
    components: {
      MyModal
    },
    vuex: {
      actions: {
        deleteDriver
      },
      getters: {
        driver: getCurrentDriver
      }
    },
    methods: {
      removeDriver () {
        this.deleteDriver(this.driver).then(this.$router.go({ name: 'drivers.index' }))
      }
    }
  }
</script>
