<template class="font-inter">
  <AppLayout class="font-inter">
      <router-view class="font-inter"/>
  </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import {lifecycleLoggerMixin} from "@/mixins/lifecycleLoggerMixin.js";

export default {
  name: 'App',
  components: {AppLayout},
  mixins: [lifecycleLoggerMixin],
  mounted() {
    document.body.style.fontFamily = "Inter, sans-serif";
  }
}

</script>
