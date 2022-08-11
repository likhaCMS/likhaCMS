<template>
  <q-dialog full-width persistent class="z-top" ref="dialogRef">
    <q-layout view="hHh LpR fFf" container class="bg-white">

      <q-page-container>
        <q-page class="bg-dark row" style="overflow: hidden; max-height: calc(100vh - 150px) !important;">
          <div class="col">
            <div ref="refEditor" class="fit"></div>
          </div>
        </q-page>
      </q-page-container>

      <q-header class="bg-secondary shadow-15">
        <q-toolbar>
          <q-btn flat round dense icon="language" />
          <q-toolbar-title>
            Global Props | Functions
            <!-- <q-btn color="info" flat dense round icon="language"/> -->
          </q-toolbar-title>
          <q-space />
          <!-- <q-btn flat round dense icon="menu" /> -->
          <q-btn flat v-close-popup @click="cancel" round dense icon="close" />
        </q-toolbar>
      </q-header>

      <q-footer class="bg-dark text-white shadow-up-10">
        <q-toolbar>
          <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
          <!-- <div class="q-gutter-md">
            <q-chip color="green" text-color="white" label="<lk-page-components />" />
            <q-chip color="purple" text-color="white" label="<lk-page-[ left / right ]-components />" />
            <q-chip color="cyan" text-color="white" label="<lk-page-[ header / footer ]-components />" />
          </div> -->
          <q-space />
          <q-btn :disabled="!templateHasChanges" color="secondary" icon="save" label="save" @click="save" />
        </q-toolbar>
      </q-footer>
    </q-layout>
  </q-dialog>
</template>

<script setup>
/* eslint-disable no-new-func */
import { useDialogPluginComponent } from 'quasar'
import { getCurrentInstance, onMounted, onBeforeUnmount, ref } from 'vue'

const { $likhaAPI, $monaco } = getCurrentInstance().appContext.config.globalProperties

const { dialogRef, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

const refEditor = ref(null)

const templateHasChanges = ref(false)

let editor

let vars = '{}'

onBeforeUnmount(() => {
  // editor.model.dispose()
  editor.dispose()
})

onMounted(async () => {
  try {
    vars = (await $likhaAPI.get('/global-property')).data.data.attributes.variables
  } catch (e) {
    console.log('No Global Variables', e)
  }

  if (editor) {
    editor.model.dispose()
    editor.dispose()
  }

  const addReturnIfNeeded = str => {
    if (typeof str !== 'string') return 'return ' + str
    const firstToken = str.split(/\b\s+/)[0]
    if (firstToken.includes('return')) return str
    return 'return ' + str
  }

  vars = addReturnIfNeeded(vars)

  setTimeout(() => {
    console.log('', refEditor.value)
    editor = $monaco.editor.create(refEditor.value, {
      value: vars,
      language: 'javascript',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vs-dark'
    })

    editor.onKeyDown((event) => {
      const { keyCode, ctrlKey, metaKey } = event
      // console.log('pressing', keyCode)
      if ((keyCode === 49) && (metaKey || ctrlKey)) {
        event.preventDefault()
        if (templateHasChanges.value) save()
      }
    })

    editor.model = editor.getModel()

    editor.model.onDidChangeContent(() => {
      const currentChanges = editor.model.getValue()
      templateHasChanges.value = currentChanges !== vars

      if (templateHasChanges.value) {
        try {
          (function () {
            // eslint-disable-next-line no-new
            new Function(currentChanges)
          })()
        } catch (error) {
          templateHasChanges.value = false
        }
      }
      // console.log('content has Change', this.codeHasChanges, this['monacoEditor-' + code.prop].model.getValue(), this.codes[i].value)
    })
  }, 300)
})

// this is part of our example (so not required)
async function save () {
  vars = editor.model.getValue()
  await $likhaAPI.put('/global-property', {
    data: {
      variables: vars
    }
  })
  templateHasChanges.value = false
  if (templateHasChanges.value) onDialogOK(editor.model.getValue())
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}

async function cancel () {
  onDialogCancel()
}
</script>
