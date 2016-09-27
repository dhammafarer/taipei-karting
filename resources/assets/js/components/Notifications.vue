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
