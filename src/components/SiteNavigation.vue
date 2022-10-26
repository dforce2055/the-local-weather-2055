<template>
  <header class="bg-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6">
      <router-link
        to="/"
      >
        <div class="flex items-center gap-3 text-warning text-2xl">
          <mdicon
            name="weather-sunny"
            size="32"
          />
          <p class="text-2xl font-sans text-white">
            The Local Weather
          </p>
        </div>
      </router-link>
      <div class="flex gap-3 flex-1 text-xl justify-end text-white">
        <div
          class="tooltip"
          data-tip="More info"
        >
          <mdicon
            @click="onOpenModal"
            class="hover:text-warning cursor-pointer duration-200"
            name="information"
            size="20"
          />
        </div>
        <div
          class="tooltip"
          data-tip="Add"
        >
          <mdicon
            @click="addCity"
            class="hover:text-warning cursor-pointer duration-200"
            name="plus"
            size="20"
          />
        </div>
      </div>
    </nav>
    <Modal
      :open="openModal"
      title="About"
      @close="openModal = false"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from './Modal.vue'
import { ElNotification } from 'element-plus'
import {
  CITY_TYPE,
  LocationUI
} from '../types'

export default defineComponent({
  name: 'SiteNavigation',
  components: {
    Modal
  },
  data: () => ({
    darkMode: false,
    openModal: false
  }),
  methods: {
    onOpenModal() {
      this.openModal = true
    },
    addCity() {
      try {

        let savedCities: LocationUI[] = []

        if (localStorage.getItem('saved-cities'))
          savedCities = JSON.parse(localStorage.getItem('saved-cities') || '')

        const locationObject: LocationUI = {
          id: Date.now(), // random id
          city: this.$route.params.city as string,
          state: this.$route.params.state as string,
          country: this.$route.params.country as string,
          coords: {
            lat: this.$route.query.lat as string,
            lng: this.$route.query.lng as string
          },
          place_name: '',
          text: '',
          type: CITY_TYPE.FEATURE
        }

        savedCities.push(locationObject)
        localStorage.setItem('saved-cities', JSON.stringify(savedCities))
        this.$emit('add-city-to-localstorage')

        let query = Object.assign({}, this.$route.query)
        delete query.preview
        this.$router.replace({ query })

        this.onSuccessAddCity()
      } catch (error) {
        this.$emit('error', error)
      }
    },
    onSuccessAddCity() {
      ElNotification({
        title: 'Success',
        message: 'City added successfully',
        duration: 3500,
        type: 'success'
      })
    },
  }
})
</script>

<style lang="scss">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
