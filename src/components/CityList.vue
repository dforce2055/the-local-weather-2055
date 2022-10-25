<template>
  <section>
    <Skeleton
      v-if="loading"
    />
    <section v-else>
      <div
        v-for="city in cities"
        :key="city.id"
      >
        <CityCard
          :location="city"
          class="flex justify-center w-12/12"
        />
      </div>
      <p
        v-if="cities.length === 0"
        class="shadow-sm bg-gray-100 border-sky-300 my-4 p-4 text-gray-500"
      >
        No locations added. To start tracking a location, search in the field above.
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Skeleton from '@/components/Skeleton.vue'
import CityCard from '@/components/CityCard.vue'
import {
  LocationUI,
} from '../types'

export default defineComponent({
  name: 'CityList',
  components: {
    CityCard,
    Skeleton,
  },
  data: () => ({
    loading: false,
    cities: [] as LocationUI[]
  }),
  async beforeMount() {
    this.cities = await this.getSavedCitiesWeatherData()
  },
  methods: {
    async getSavedCitiesWeatherData() {
      try {
        let savedCities: LocationUI[] = []

        if (localStorage.getItem('saved-cities'))
          savedCities = JSON.parse(localStorage.getItem('saved-cities') || '')

        this.loading = true

        const apiKey = process.env.VUE_APP_OPEN_WEATHER

        const requests = savedCities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coords?.lat}&lon=${city.coords?.lng}&exclude={part}&appid=${apiKey}&units=metric`
          const result = await axios.get(url)
          return result.data
        })

        const weatherData = await Promise.all(requests)

        weatherData.map((data, index) => {
          savedCities[index].weatherData = { ...data }
        })

        this.loading = false
        return savedCities as LocationUI[]
      }
      catch (error) {
        this.$emit('error', error)
        this.loading = false
        const savedCities: LocationUI[] = []
        return savedCities
      }
    },
    goToCityView(location: LocationUI) {
      console.log('goToCityView', location)
      this.$router.push({
        name: 'city',
        params: {
          city: location.city.toLocaleLowerCase().replaceAll(' ', '-'),
          state: location.state.toLocaleLowerCase().replaceAll(' ', '-'),
          country: location.country.toLocaleLowerCase().replaceAll(' ', '-'),
        },
        query: {
          lat: location.geometry?.coordinates[1],
          lng: location.geometry?.coordinates[0],
          preview: 'true'
        }
      })
    }
  }
})

</script>
<style lang="scss" scoped>
</style>