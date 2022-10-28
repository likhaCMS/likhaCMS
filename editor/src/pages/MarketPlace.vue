<template>
  <q-layout view="lhh LpR lfr">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="shadow-6">
        <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          Marketplace
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        <span class="q-gutter-sm">
          <!-- <q-btn dense icon="preview" label="preview &nbsp;" @click="preview" /> -->
          <!-- <q-btn dense :disabled="!hasChanges" icon="save" label="save &nbsp;" @click="save" /> -->

          <login-status />
        </span>

      </q-toolbar>
      <div class="row q-pa-md">
        <q-btn icon="add_shopping_cart" label="Get more out of LikhaCMS" class="q-ml-md" flat color="grey" dense />
        <q-space />
        <!-- <q-input modelValue="page.path" dense dark /> -->
        <q-input dark dense standout
          v-model="searchText"
          @update:model-value="getComponents"
          class="" input-class="text-right"
        >
          <template v-slot:append>
            <q-icon v-if="searchText === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
          </template>
        </q-input>

        <!-- <q-input v-model="page.path" readonly dense dark label="path" class="q-ma-sm" />
        <q-space />
        <q-btn icon="dashboard" label="Page Layout" @click="openTemplateEditor" class="q-pr-md" flat color="secondary" dense />
        <q-tabs align="right" dense v-model="env">
          <q-tab name="/dev-env" label="dev" />
          <q-tab name="/staging-env" label="staging" />
          <q-tab name="" label="prod" />
        </q-tabs> -->
      </div>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <q-card class="my-card" flat bordered>
          <q-card-section>
            <!-- <q-card-section>
            </q-card-section> -->
            <div class="row">
              <div class="q-mt-sm">
                <q-img
                  class="rounded-borders logo"
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
                />
              </div>
              <div class="col q-ml-sm">
                <div class="text-h6 q-mb-xs">Title</div>
                <div class="text-caption text-grey ellipsis-2-lines">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <!-- <q-btn flat round icon="event" size="sm" /> -->
            <q-btn icon="description" label="Learn More" flat color="blue-grey" size="sm" dense />
            <q-btn icon="file_download" label="Install" flat color="secondary" size="sm" dense />
          </q-card-actions>
        </q-card>
      </div>
    </q-page-container>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated @mouseleave="leftDrawerOpen = false">
      <essential-link />
    </q-drawer>

  </q-layout>
</template>

<script setup>
/* eslint-disable no-new-func */
/* eslint-disable vue/no-parsing-error */
import EssentialLink from 'components/EssentialLink.vue'
import loginStatus from 'components/loginStatus.vue'
import { ref } from 'vue'

const searchText = ref('')

const leftDrawerOpen = ref(false)

function getComponents () {}

</script>

<style scoped>
.my-card {
  max-width: 400px;
  min-width: 300px;
}

.logo {
  width: 64px;
  height: 64px;
}

.text-caption {
  min-width: 200px;
}
</style>
