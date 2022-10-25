<template>
  <div class="city">
    <AsyncCityView
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElNotification } from 'element-plus'
import AsyncCityView from '@/components/AsyncCityView.vue'

export default defineComponent({
  name: 'CityView',
  components: {
    AsyncCityView,
  },
  data: () => ({
  }),
  methods: {
    onError(error: any) {
      ElNotification({
        title: 'Error',
        message: error.message,
        duration: 5000,
        type: 'error'
      })
    }
  }
})
</script>
