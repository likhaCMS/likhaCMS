<template>
  <q-btn v-if="$global.dev" dense round :label="$usernameAvatar.value" dark color="blue-grey-10" text-color="secondary" >
    <q-menu anchor="bottom right" self="top right">
      <q-list style="min-width: 100px">
        <q-item >
          <q-item-section>
            {{ $global.dev.email }}
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item @click="$logoutLikhaUser" clickable v-close-popup>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <q-btn v-else dense icon="fa-brands fa-github" label="Login" dark color="blue-grey-10" text-color="secondary"
    @click="$popupCenter({url: $likhaAPI.defaults.baseURL + '/connect/github', title: 'LikhaCMS Login', w: 900, h: 600})"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  data: () => ({
    links: [
      {
        icon: '',
        label: 'Page Builder',
        caption: 'Drag & Drop Page Builder',
        to: '/page-editor'
      }
    ]
  })
})
</script>
