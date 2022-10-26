<template>
  <div class="container px-1 py-4 mx-auto rounded-md p-4 w-full sm:w-9/12">
    <div class="flex items-center lg:w-2/6 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col animate-pulse ">
      <div class="py-4 mt-6 rounded-full bg-slate-200 sm:w-26 sm:h-26 h-20 w-20 sm:mr-10" />
      <div class="lg:flex-1 w-6/12 space-y-6 py-1 ">
        <div class="h-4 bg-slate-200 rounded mt-6 lg:w-8/12 lg:mt-0" />
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-200 rounded col-span-2 " />
            <div class="h-2 bg-slate-200 rounded col-span-1" />
          </div>
          <div class="h-2 bg-slate-200 rounded" />
        </div>
        <div class="space-y-3">
          <div class="h-11 lg:w-6/12 bg-sky-100 rounded col-span-2 mt-2 pt-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'SkeletonCityCard',
});
</script>
