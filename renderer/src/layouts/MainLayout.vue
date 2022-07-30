<template>
  <div class="col bg-grey">
    asd
  </div>
  <!-- <MyComponent name="Trin Pogi" /> -->
  <component :is="MyComponent" name="Pogi" />
</template>

<script setup>
import { defineComponent } from 'vue'

const MyComponent = defineComponent({
  props: {
    name: String
  },
  template: '<div>Hi {{ name }}</div>'
})
</script>
