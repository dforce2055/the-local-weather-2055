<template>
  <div
    v-if="location"
    class="container px-1 py-4 mx-auto">
    <div class="flex items-center lg:w-2/6 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div class="sm:w-26 sm:h-26 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-sky-500 flex-shrink-0">
        <img
          class="w-[100px] h-[100px] object-cover"
          :src="`https://openweathermap.org/img/wn/${location.weatherData?.current?.weather[0].icon}@2x.png`"
          alt=""
        >
        <span
          class="text-2xl rounded-full p-2 text-shadow-sm text-white shadow-sm"
          :class="Math.round(location.weatherData?.current?.temp || 0) < 20
            ? 'bg-sky-300 border-sky-700'
            : 'bg-amber-400 border-ambar-700'"
        >
          {{ Math.round(location.weatherData?.current?.temp || -1) }}&deg;
        </span>
      </div>
      <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 class="text-gray-900 text-lg title-font mb-2 capitalize font-bold">
          {{ getNameFormated(location.city) }}
        </h2>
        <p class="leading-relaxed text-base capitalize">
          {{ getCountryAndStateNameFormated(location.country, location.state) }}
        </p>
        <p class="text-gray-500">
          {{ getCurrenTime(location.weatherData?.timezone || '') }}
        </p>
        <button class="btn btn-outline btn-primary mt-4">
          More details
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  LocationUI,
} from '../types'

export default defineComponent({
  name: 'CityCard',
  props: {
    location: {
      type: Object as PropType<LocationUI>,
      required: true
    }
  },
  data: () => ({
  }),
  methods: {
    getNameFormated(name: string) {
      try {
        return name.replaceAll('-', ' ')
      } catch (error) {
        this.$emit('error', error)
        return name
      }
    },
    getCountryAndStateNameFormated(country: string, state: string) {
      try {
        return `${this.getNameFormated(country)}, ${this.getNameFormated(state)}`
      } catch (error) {
        this.$emit('error', error)
        return `${country}, ${state}`
      }
    },
    getCurrenTime(timeZone: string) {
      const options = {
        dateStyle: 'medium',
        timeStyle: 'long',
        timeZone
      } as Intl.DateTimeFormatOptions

      const date = new Date()
      return new Intl.DateTimeFormat('en-US', options).format(date)
    },
  }
})

</script>
<style lang="scss" scoped>
</style>
