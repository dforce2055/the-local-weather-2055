<template>
  <section>
    <p>{{ t('hello') }}</p>
    <p>{{ t('message') }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'HelloI18n',
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })

    // Something todo ..

    return { t }
  }
})
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "es": {
    "hello": "Re bigot!"
  }
}
</i18n>
