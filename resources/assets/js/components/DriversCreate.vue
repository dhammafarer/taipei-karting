<template>
  <div class="Drivers-create">
    <div class="panel panel-default">

      <div class="panel-heading">
        <h3 class="panel-title">
          Create New Driver
        </h3>
      </div>

      <div class="panel-body">
        <drivers-edit-form></drivers-edit-form>
      </div>
    </div>

  </div>
</template>

<script>
  import DriversEditForm from './DriversEditForm.vue'

  export default {
    name: "DriversCreate",
    components: {
      DriversEditForm
    }
  }
</script>
