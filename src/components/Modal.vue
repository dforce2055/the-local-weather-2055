<template>
  <Teleport to="body">
    <div
      class="modal"
      :class="isOpen ? 'modal-open' : ''"
    >
      <div class="modal-box relative">
        <label
          @click="onClose"
          for="my-modal-3"
          class="btn btn-sm btn-circle absolute right-2 top-2"
        >✕</label>
        <h3 class="text-lg font-bold">
          {{ title }}
        </h3>
        <p
          v-if="message"
          class="py-4"
        >
          {{ message }}
        </p>
        <section>
          <p class="mb-4">
            The Local Weather allows you to track the current and
            future weather of cities of your choosing.
          </p>
          <h3 class="text-lg font-bold">
            How it works:
          </h3>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the
              search bar.
            </li>
            <li>
              Select a city within the results, this will take
              you to the current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the
              top right. This will save the city to view at a
              later time on the home page.
            </li>
          </ol>

          <h3 class="text-lg font-bold">
            Removing a city
          </h3>
          <p>
            If you no longer wish to track a city, simply select
            the city within the home page. At the bottom of the
            page, there will be am option to delete the city.
          </p>
        </section>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Congratulations random Internet user!',
      required: false
    },
    message: {
      type: String,
      default: ``,
      required: false
    }
  },
  emits: ['open', 'close'],
  data: () => ({
    isOpen: false
  }),
  watch: {
    open(val) {
      if (val)
        this.onOpen()
      else
        this.onClose()
    }
  },
  methods: {
    onOpen() {
      this.isOpen = true
      this.$emit('open')
    },
    onClose() {
      this.isOpen = false
      this.$emit('close')
    }
  }
})
</script>

<style scoped>

</style>
