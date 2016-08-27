<template>
  <my-modal>
    <button class="btn btn-default" slot="trigger">Edit</button>

    <span slot="title">Edit Driver</span>

    <drivers-edit-form slot="body"></drivers-edit-form>

    <button slot="cancel" class="btn btn-default">Cancel</button>
  </my-modal>
</template>

<script>
  import MyModal from './Modal.vue'
  import DriversEditForm from './DriversEditForm.vue'

  export default {
    components: {
      MyModal,
      DriversEditForm
    }
  }
</script>
