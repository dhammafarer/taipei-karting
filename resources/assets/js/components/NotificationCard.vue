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

<style lang="sass">
  @import 'resources/assets/sass/_variables.scss';

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
    background-color: $green;
    opacity: .7;
  }

  .Notification--danger {
    background-color: $red;
    opacity: .7;
  }

  .Notification__close-button {
    outline: none;
    background-color: transparent;
    border: none;
  }
</style>
