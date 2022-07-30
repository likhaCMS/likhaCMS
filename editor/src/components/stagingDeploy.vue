<template>
  <q-dialog persistent class="z-top" ref="dialogRef" @hide="onDialogHide">
    <q-card class="bg-dark text-white" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Staging Deployment</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dark v-model="data.summary" type="text" label="Summary" />
        <q-input dark v-model="data.description" type="textarea" label="Description" autogrow input-style="min-height: 64px;" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup @click="onDialogCancel" />
        <q-btn :disabled="!data.summary" flat label="Commit" @click="save" />
      </q-card-actions>
    </q-card>
    <!-- <q-layout view="hHh LpR fFf" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>{{ component.name }} | Staging Deployment</q-toolbar-title>
          <q-btn flat @click="onDialogCancel" v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-page-container style="heigh">
        <q-page padding class="bg-dark inset-shadow-down">
          <q-input dark v-model="data.summary" type="text" label="Summary" />
          <q-input dark v-model="data.description" type="textarea" label="Description" autogrow />
        </q-page>
      </q-page-container>

      <q-footer class="bg-dark text-white">
        <q-toolbar>
          <q-toolbar-title>
          </q-toolbar-title>
          <q-btn color="primary" @click="save" icon="save" label="Commit"/>
        </q-toolbar>
      </q-footer>
    </q-layout> -->
  </q-dialog>
</template>

<script setup>
/* eslint-disable no-new-func */
import { useDialogPluginComponent } from 'quasar'
import { onBeforeMount, getCurrentInstance, reactive } from 'vue'

const { $likhaAPI } = getCurrentInstance().appContext.config.globalProperties

const props = defineProps(['component', 'codes'])

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const data = reactive({
  props: [],
  summary: '',
  description: ''
})

onBeforeMount(async () => {
  //   asd

  // console.log($likhaAPI, $qs)
})

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
async function save () {
  const dataCode = {}
  const versionCode = {}
  for (const code of props.codes) {
    dataCode[code.prop + 'Staging'] = code.value
    versionCode[code.prop] = code.value
  }

  await $likhaAPI.put('/components/' + props.component.id, {
    data: dataCode
  })

  const { summary, description } = data

  const version = {
    component: props.component.id,
    summary,
    description,
    codes: JSON.stringify(versionCode)
  }

  await $likhaAPI.post('/versions', {
    data: version
  })

  // console.log(props.codes, dataCode, version)

  onDialogOK(version)
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
