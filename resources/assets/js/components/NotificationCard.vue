<template>

  <div class="Notification" :class="'Notification--' + notification.type">

    <button class="pull-right Notification__close-button"
      v-if="notification.type === 'danger'"
      @click="closeNotification(notification)"
    >
    <span class="glyphicon glyphicon-remove"></span>
    </button>

    <span v-if="notification.type === 'success'" class="icon-ok"></span>
    <span v-if="notification.type === 'danger'" class="icon-warning"></span>
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
