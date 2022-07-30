<template>
  <router-view v-slot="{ Component }">
    <suspense>
        <component :is="Component" />
    </suspense>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
