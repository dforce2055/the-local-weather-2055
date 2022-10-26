<template>
  <section class="flex flex-col flex-1 items-center">
    <div class="flex flex-col items-center w-9/12 lg:w-3/12 py-12 border-gray-20 animate-pulse">
      <div class="h-10 bg-slate-200 rounded mt-1 w-full" />
      <div class="h-6 bg-slate-200 rounded mt-3  w-full" />
      <div class="h-20 bg-slate-200 rounded mt-5 w-5/12" />
      <div class="h-4 bg-slate-200 rounded mt-6 w-5/12" />
      <div class="h-4 bg-slate-200 rounded mt-2 w-5/12" />
      <div class="h-20 sm:w-26 sm:h-26 w-20 bg-slate-200 rounded-full mt-5 text-center" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SkeletonAsyncCityView',
});
</script>
