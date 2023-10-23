<template>
  <AppLayout>
      <router-view/>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import {lifecycleLoggerMixin} from "@/mixins/lifecycleLoggerMixin.js";

export default {
  name: 'App',
  components: {AppLayout},
  mixins: [lifecycleLoggerMixin]
}
</script>