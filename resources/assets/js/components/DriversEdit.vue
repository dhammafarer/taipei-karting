<template>
  <div class="modal-mask">
    <div class="modal-container">
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

<style>
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9998;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s ease;
  }

  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>
