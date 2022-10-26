<template>
  <el-autocomplete
    v-model="selected"
    :fetch-suggestions="method === 'suggestion' ? querySearchSuggestions : querySearchFilter"
    :clearable="cleareable"
    :placeholder="placeholder"
    @select="handleSelect"
    @input="handleInput"
    class="mt-4 py-2 input input-bordered w-full max-w-xs
    focus:border-sky-500
    hover:border-sky-500
    target:border-sky-500
    input:border-sky-500
    active:border-sky-500
    focus-visible:border-sky-500
    dark:text-primary
    dark:bg-gray-800
    "
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
interface Item {
  value: string
  link: string
}
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    method: {
      type: String,
      default: 'suggestion',
      required: false
    },
    value: {
      type: [String, Number],
      default: 'Please Input',
    },
    cleareable: {
      type: Boolean,
      default: false,
    },
    clearSelected: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Please Input',
    },

  },
  data: () => ({
    selected: '',
  }),
  watch: {
    value(val) {
      const result = this.items.find(item => item.id === val)
      if (result)
        this.selected = result.value
    },
    clearSelected(value) {
      if (value)
        this.selected = ''
    }
  },
  methods: {
    querySearchFilter(queryString: string, cb: any) {
      const results = queryString
        ? this.items.filter((obj) =>  JSON.stringify(obj)
          .toLowerCase()
          .includes(queryString.toLowerCase())
        )
        : this.items
      // call callback function to return suggestions
      cb(results)
    },
    querySearchSuggestions(queryString: string, cb: any) {
      const results = this.items
      cb(results)
    },
    handleSelect(item: Item) {
      this.$emit('selected', item)
    },
    handleInput(searchTerm: string) {
      this.$emit('input', searchTerm)
    }
  }
})
</script>
<style lang="scss">

.el-input__wrapper {
  padding: 0px !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--form-input-color) !important;
  font: var(--font-family-inter) !important;
  font-size: 1rem !important;
}
.el-input__inner {
  color: var(--form-input-color) !important;
  font: var(--font-family-inter) !important;
  font-size: 1rem !important;
}
.dark .el-input__inner {
  color: theme('colors.sky.300') !important;
  background-color: theme('colors.gray.800') !important;
}
</style>
