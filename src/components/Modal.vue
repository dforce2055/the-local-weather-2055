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
            {{ $t('modal-title') }}
          </p>
          <h3 class="text-lg font-bold">
            {{ $t('how-it-works') }}:
          </h3>
          <ol class="list-decimal list-inside mb-4">
            <li>
              {{ $t('search-for-city') }}
            </li>
            <li>
              {{ $t('select-city') }}
            </li>
            <li>
              {{ $t('track-city') }}
            </li>
          </ol>

          <h3 class="text-lg font-bold">
            {{ $t('removing-city') }}
          </h3>
          <p>
            {{ $t('untrack-city') }}
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
