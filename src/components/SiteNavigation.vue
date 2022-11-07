<template>
  <header class="bg-primary dark:bg-gray-900 shadow-lg">
    <nav class="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      <DarkModeSelector
        :size="10"
      />
      <router-link
        to="/"
      >
        <div class="flex items-center gap-3 text-warning text-2xl">
          <p class="text-2xl font-sans text-white dark:text-primary">
            {{ $t('app-title') }}
          </p>
        </div>
      </router-link>
      <div class="flex gap-3 flex-1 text-xl justify-end text-white">
        <div
          class="tooltip tooltip-bottom"
          :data-tip="$t('more-info')"
        >
          <mdicon
            @click="onOpenModal"
            class="hover:text-warning cursor-pointer duration-200"
            name="information"
            size="20"
          />
        </div>
        <div
          class="tooltip tooltip-bottom"
          :data-tip="$t('add-city')"
        >
          <mdicon
            @click="addCity"
            class="hover:text-warning cursor-pointer duration-200"
            name="plus"
            size="20"
          />
        </div>
        <LanguageSelector />
      </div>
    </nav>
    <Modal
      :open="openModal"
      :title="$t('about')"
      @close="openModal = false"
    />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Modal from './Modal.vue'
import DarkModeSelector from './DarkModeSelector.vue'
import LanguageSelector from './LanguageSelector.vue'
import { ElNotification } from 'element-plus'
import {
  CITY_TYPE,
  ROUTES_PATH,
  LocationUI,
} from '../types'

export default defineComponent({
  name: 'SiteNavigation',
  components: {
    Modal,
    DarkModeSelector,
    LanguageSelector,
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

        const currentPathName = this.$router.currentRoute.value.name
        if (currentPathName !== ROUTES_PATH.CITY)
          return

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
        duration: 2500,
        type: 'success',
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
