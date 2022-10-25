<template>
  <section class="">
    <Skeleton
      v-if="loading"
    />
    <section
      v-else
      class="flex flex-col flex-1 items-center"
    >
      <!-- Banner -->
      <div
        v-if="$route.query.preview"
        class="w-full text-center bg-gray-100 p-4"
      >
        <p class="text-gray-500">
          You are currently previewing this city, click the "+"
          icon to start tracking this city.
        </p>
      </div>

      <!-- Weather Overview -->
      <div
        class="flex flex-col items-center py-12"
      >
        <h1 class="text-4xl mb-2 capitalize">
          {{ getCityNameFormated($route.params.city) }}
        </h1>
        <p class="text-lg mb-2 text-gray-500">
          {{ weatherData?.currentTime }}
        </p>
        <p class="text-8xl mb-8">
          {{ Math.round(weatherData?.current?.temp) }}&deg;
        </p>
        <div class="text-center">
          <p>
            Feels like
            {{ Math.round(weatherData?.current?.feels_like) }}&deg;
          </p>
          <p class="capitalize">
            {{ weatherData?.current?.weather[0].description }}
          </p>
          <img
            class="w-[150px] h-auto"
            :src="`https://openweathermap.org/img/wn/${weatherData?.current?.weather[0].icon}@2x.png`"
            alt=""
          >
        </div>
      </div>

      <div class="divider" />

      <!-- Hourly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-gray-500">
          <h2 class="mb-4">
            Hourly Weather
          </h2>
          <div class="flex gap-10 overflow-x-scroll scrollbar">
            <div
              v-for="hourData in weatherData.hourly"
              :key="hourData.dt"
              class="flex flex-col gap-4 items-center"
            >
              <p class="whitespace-nowrap text-md">
                {{ getCurrenHourTime(hourData.dt) }}
              </p>
              <img
                class="w-auto h-[50px] object-cover"
                :src="`https://openweathermap.org/img/wn/${hourData?.weather[0].icon}@2x.png`"
                alt=""
              >
              <p class="text-xl">
                {{ Math.round(hourData.temp) }}&deg;
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="divider" />

      <!-- Weekly Weather -->
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-gray-500">
          <h2 class="mb-4">
            7 Day Forecast
          </h2>
          <div
            v-for="dayData in weatherData.daily"
            :key="dayData.dt"
            class="flex items-center"
          >
            <p class="flex flex-1 justify-start">
              {{ getCurrenWeekDay(dayData.dt) }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${dayData?.weather[0].icon}@2x.png`"
              alt=""
            >
            <div class="flex gap-2 flex-1 justify-end">
              <p>
                H:{{ Math.round(dayData.temp.max) }}&deg;
              </p>
              <p>
                L:{{ Math.round(dayData.temp.min) }}&deg;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Skeleton from '@/components/Skeleton.vue'
import {
  OpenWeatherDataApiDto
} from '../types'
import { LocationQueryValue } from 'vue-router'

export default defineComponent({
  name: 'AsyncCityView',
  components: {
    Skeleton,
  },
  data: () => ({
    weatherData: {} as OpenWeatherDataApiDto,
    loading: true
  }),
  async beforeMount() {
    try {
      const lat = this.$route.query.lat as string
      const lng = this.$route.query.lng as string

      this.weatherData = await this.getWeatherData(lat, lng)
    } catch (error) {
      this.$emit('error', error)
    }
  },
  methods: {
    async getWeatherData(lat: string, lon: string) {
      try {
        this.loading = true
        const apiKey = process.env.VUE_APP_OPEN_WEATHER
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`

        const result = await axios.get(url)
        const { data } = result

        const currentTime = this.getCurrenTime(data.timezone)
        data.currentTime = currentTime

        this.loading = false

        return data
      } catch (error) {
        this.$emit('error', error)
        this.loading = false
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
    getCurrenHourTime (timestamp: number) {
      const options = {
        hour: 'numeric'
      } as Intl.DateTimeFormatOptions

      const date = new Date(timestamp*1000)
      return new Intl.DateTimeFormat('en-US', options).format(date)
    },
    getCurrenWeekDay (timestamp: number) {
      const options = {
        weekday: 'long'
      } as Intl.DateTimeFormatOptions

      const date = new Date(timestamp*1000)
      return new Intl.DateTimeFormat('en-US', options).format(date)
    },
    getCityNameFormated(name: string | LocationQueryValue | LocationQueryValue[]) {
      try {
        const nameParam = name as string
        const nameFormated = nameParam.replaceAll('-', ' ')
        return nameFormated
      } catch (error) {
        this.$emit('error', error)
        return name
      }
    }
  }
})

</script>
