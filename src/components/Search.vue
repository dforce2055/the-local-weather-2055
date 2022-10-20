<template>
  <div>
    <section v-if="false">
      <input
        @input="callApi"
        v-model="search"
        type="text"
        placeholder="Search for a City or State ..."
        class="mt-4 input input-bordered w-full max-w-xs"
      >
      <ul
        v-if="searchResults"
        class="absolute bg-transparent text-primary w-full shadow-md py-2 px-1 top-[166px]"
      >
        <li
          v-if="noResults"
          class="py-2 cursor-pointer"
        >
          No results
        </li>
        <template v-else>
          <li
            v-for="result in searchResults"
            :key="result.id"
            class="py-2 cursor-pointer"
          >
            {{ result.place_name }}
          </li>
        </template>
      </ul>
      <div>
        Latitude: {{ coords.latitude }}
        Longitude: {{ coords.longitude }}
      </div>
    </section>
    <section>
      <Autocomplete
        v-model="search"
        :items="searchResults"
        clearable
        placeholder="Search for a City or State ..."
        @input="callApi"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useGeolocation, useDebounceFn } from '@vueuse/core'
import axios from 'axios'
import Autocomplete from './Autocomplete.vue'

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
          searchResults.value = data.features.map((item: any) => {
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
    items: [
      { value: 'vue', link: 'https://github.com/vuejs/vue' },
      { value: 'element', link: 'https://github.com/ElemeFE/element' },
    ]
  }),
  methods: {
    handleSelect() {
      this.$emit('handleSelect');
    }
  },
})
</script>
