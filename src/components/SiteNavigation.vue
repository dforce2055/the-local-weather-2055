<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 py-6">
      <router-link
        to="/"
      >
        <div class="flex items-center gap-3 text-warning text-2xl">
          <mdicon
            name="weather-sunny"
            size="32"
          />
          <p class="text-2xl text-white">
            The Local Weather
          </p>
        </div>
      </router-link>
      <div class="flex gap-3 flex-1 text-xl justify-end text-white">
        <mdicon
          @click="onOpenModal"
          class="hover:text-warning cursor-pointer duration-200"
          name="information"
          size="20"
        />
        <mdicon
          @click="onTest"
          class="hover:text-warning cursor-pointer duration-200"
          name="plus"
          size="20"
        />
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
    onTest() {
      this.$emit('testing')
    }
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
