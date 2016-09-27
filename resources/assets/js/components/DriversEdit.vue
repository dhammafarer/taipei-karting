<template>
  <div class="Modal__Mask">
    <div class="Modal__Container">
      <div class="panel panel-default">

        <div class="panel-heading">
          <h3 class="panel-title">
            Edit Driver
          </h3>
        </div>

        <div class="panel-body">
          <drivers-edit-form :show.sync="show"></drivers-edit-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import DriversEditForm from './DriversEditForm.vue'

  export default {
    name: "DriversEdit",
    components: {
      DriversEditForm
    },
    props: ['show']
  }
</script>
