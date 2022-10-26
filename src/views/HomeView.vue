<template>
  <div class="home">
    <Search
      @error="onError"
      @city-selected="onSelecCity"
    />
    <CityList />
    <section class="flex justify-center mb-5">
      <DownloadApp />
    </section>
    <section>
      <Stats />
    </section>
    <section>
      <Cards />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import PersonComponent from '@/components/PersonComponent.vue'
import Cards from '@/components/Cards.vue'
import DownloadApp from '@/components/DownloadApp.vue'
import Search from '@/components/Search.vue'
import CityList from '@/components/CityList.vue'
import Stats from '@/components/Stats.vue'
import { ElNotification } from 'element-plus'
import {
  LocationUI
} from '../types'
export default defineComponent({
  name: 'HomeView',
  components: {
    Cards,
    CityList,
    DownloadApp,
    Search,
    Stats
  },
  methods: {
    onError(error: any) {
      ElNotification({
        title: 'Error',
        message: error.message,
        duration: 5000,
        type: 'error'
      })
    },
    onSelecCity(location: LocationUI) {
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
