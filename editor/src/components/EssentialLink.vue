<template>
  <div class="absolute-top" style="height: 50px;" >
    <q-toolbar class="bg-dark text-white col">
      <q-btn>
        <q-avatar>
          <img src="https://likhacms.github.io/assets/images/likha-logo.png">
        </q-avatar>
      </q-btn>
      <q-toolbar-title>
        likhaCMS
      </q-toolbar-title>
    </q-toolbar>
  </div>
  <q-scroll-area class="inset-shadow bg-grey-10 text-white" style="height: calc(100% - 50px); margin-top: 50px;">
    <q-list dark>
      <q-item-label
        header
      >
        Essential Links
      </q-item-label>

      <q-item
        dark
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        clickable
        exact-active-class="text-secondary"
      >
        <q-item-section
          avatar
        >
          <q-icon :name="l.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ l.label }}</q-item-label>
          <q-item-label caption>{{ l.caption }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  data: () => ({
    links: [
      {
        icon: 'web',
        label: 'Page Builder',
        caption: 'Drag & Drop Page Builder',
        to: '/page-editor'
      },
      {
        icon: 'code',
        label: 'Component Editor',
        caption: 'Edit your UI using Vue.js',
        to: '/component-editor'
      },
      {
        icon: 'add_shopping_cart',
        label: 'Marketplace',
        caption: 'Get more UI Components',
        to: '/marketplace'
      }
    ]
  })
})
</script>
