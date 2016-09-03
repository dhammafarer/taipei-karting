<template>

  <div class="Notification" :class="'Notification--' + notification.type">

    <button class="pull-right Notification__close-button"
      v-if="notification.type === 'danger'"
      @click="closeNotification(notification)"
    >
    <span class="glyphicon glyphicon-remove"></span>
    </button>

    <strong>{{ notification.title }}</strong> {{ notification.body }}

  </div>

</template>

<script>
  import { closeNotification } from '../vuex/notifications/actions'

  export default {
    vuex: {
      actions: {
        closeNotification
      }
    },
    props: [ 'notification' ],
    computed: {
    },
    ready () {
      if (this.notification.type === 'success' || this.notification.type === 'danger') {
        setTimeout(() => this.closeNotification(this.notification), 3000)
      }
    }
  }
</script>

<style>
  .Notification {
    padding: 15px;
    margin-bottom: 10px;
    background-color: darkgrey;
    opacity: .8;
    color: white;
    border: 1px solid grey;
    border-radius: 4px;
    min-width: 250px;
  }

  .Notification--success {
    background-color: rgba(124,178,71,.8);
  }

  .Notification--danger {
    background-color: rgba(226,112,35,.8);
  }

  .Notification__close-button {
    outline: none;
    background-color: transparent;
    border: none;
  }
</style>
