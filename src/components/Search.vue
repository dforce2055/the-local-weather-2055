<template>
  <div>
    <section>
      <Autocomplete
        v-model="search"
        :items="searchResults"
        clearable
        :placeholder="$t('search-city-state')"
        @input="callApi"
        @selected="previewCity"
      />
      <p
        class="py-2 cursor-pointer text-slate-500 italic hover:underline"
        v-if="noResults"
      >
        {{ $t('no-results') }}
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useGeolocation, useDebounceFn } from '@vueuse/core'
import axios from 'axios'
import Autocomplete from './Autocomplete.vue'
import {
  LocationFeatureApiDto,
  LocationUI
} from '../types'

export default defineComponent({
  setup(props, context) {
    const loading = ref(false)
    const search = ref('')
    const searchResults: any = ref([])
    const errorResults: any = ref(null)
    const debounceTime = 500
    const maxWait = 5000
    const { coords, locatedAt, error } = useGeolocation()
    const noResults = computed(() => {
      return !errorResults.value && searchResults?.value?.length === 0 && search.value !== ''
    });
    const callApi = useDebounceFn(async () => {
      try {
        if (!search.value)
          return

        loading.value = true
        const apiKey = process.env.VUE_APP_MAPBOX;
        const endpoint = 'mapbox.places'
        const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${search.value}.json?access_token=${apiKey}&types=place`;
        // const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${coords.latitude},${coords.longitude}.json?access_token=${apiKey}`
        const { data } = await axios(url);
        if (data)
          searchResults.value = data.features.map((item: LocationFeatureApiDto) => {
            return {
              value: item.place_name,
              ...item
            }
          })
        else
          searchResults.value = []

        loading.value = false
      }
      catch (error) {
        loading.value = false
        context.emit('error', error)
      }
    }, debounceTime, { maxWait })
    return {
      loading,
      search,
      coords,
      locatedAt,
      error,
      callApi,
      searchResults,
      errorResults,
      noResults
    };
  },
  components: { Autocomplete },
  data: () => ({
  }),
  methods: {
    handleSelect() {
      this.$emit('handleSelect')
    },
    previewCity(citySelected: LocationFeatureApiDto) {
      try {
        const [city, state, country] = citySelected.place_name.split(',')

        const LocationUI: LocationUI = {
          ...citySelected,
          city: city.trim(),
          state: state.trim(),
          country: country.trim()
        }
        this.$emit('city-selected', LocationUI)
      } catch (error) {
        this.$emit('error', error)
      }
    }
  },
})
</script>
