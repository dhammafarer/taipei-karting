<template>
  <div class="Notifications">

    <notification-card
      v-for="notification in notifications"
      transition="slideIn"
      :notification="notification"
    >
    </notification-card>

  </div>
</template>

<script>
  import NotificationCard from './NotificationCard.vue'
  import { getAllNotifications } from '../vuex/notifications/getters'

  export default {
    components: {
      NotificationCard
    },
    vuex: {
      getters: {
        notifications: getAllNotifications
      }
    }
  }
</script>

<style>
  .Notifications {
    position: fixed;
    z-index: 9999;
    top: 100px;
    right: 20px;
    width: 80%;
  }

  .fade-transition {
    opacity: 1;
    trantision: opacity .3s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

  .slideIn-transition {
    opacity: 1;
    transform: translateX(0);
    transition: all .3s ease;
  }

  .slideIn-enter, .slideIn-leave {
    opacity: 0;
    transform: translateX(500px);
  }
</style>
