<template>
  <div
    id="language-selector"
    class="dropdown dropdown-left"
  >
    <div
      class="tooltip tooltip-bottom"
      :data-tip="$t('language-selector')"
    >
      <label
        tabindex="0"
        :class="type === 'button' ? 'btn btn-circle' : ''"
      >
        <mdicon
          class="hover:text-warning cursor-pointer duration-200"
          name="translate"
          size="20"
        />
      </label>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li
        v-for="(lang, i) in langs"
        :key="`Lang${i}`"
        :value="lang"
        @click="closeAfterSelectAnOption"
      >
        <a
          @click="$i18n.locale = lang"
          class="text-gray-600 dark:text-gray-100 text-xs"
          :class="lang === $i18n.locale ? 'text-sky-500 dark:text-sky-300' : 'text-'"
        >
          {{ lang === 'en' ? 'English' : 'Español' }} - [{{ lang }}]
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LocaleChanger',
  props: {
    type: {
      type: String,
      default: '',
      required: false,
    }
  },
  data () {
    return { langs: ['en', 'es'] }
  },
  methods: {
    closeAfterSelectAnOption() {
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur()
    }
  }
})
</script>
