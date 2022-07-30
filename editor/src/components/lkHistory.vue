<template>
  <q-dialog full-width persistent class="z-top" ref="dialogRef" @hide="onDialogHide">
    <q-layout view="hHh LpR fFf" container class="bg-white">

      <q-page-container>
        <!-- <q-page padding class="bg-dark inset-shadow-down">
          <q-input dark v-model="data.summary" type="text" label="Summary" />
          <q-input dark v-model="data.description" type="textarea" label="Description" autogrow />
        </q-page> -->
        <q-page class="bg-dark row" style="overflow: hidden; max-height: calc(100vh - 150px) !important;">
          <div class="shadow-24 bg-dark column" style="width: 300px; z-index: 5 !important;">
            <q-input dark dense standout
              v-model="searchText"
              class="q-mx-md q-my-sm" input-class="text-left">
                <template v-slot:append>
                  <q-icon v-if="searchText === ''" name="search" />
                  <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
                </template>
            </q-input>

            <div class="col">
              <q-list dark separator>
                <!-- {{ versions }} -->
                <q-item clickable v-ripple
                  v-for="v in versions" :key="'commit' + v.id"
                  @click="selectedVersion = v.id"
                  :class="{
                    'bg-blue-grey-10': selectedVersion === v.id
                  }"
                  @mouseover="hovering = v.id"
                  @mouseleave="hovering = null"
                >
                  <q-item-section>
                    <q-item-label>{{ v.summary }}</q-item-label>
                    <q-item-label caption>
                      <q-avatar size="24px" color="secondary">TB</q-avatar>
                      <span
                        :class="{
                          'text-blue-grey': selectedVersion !== v.id,
                          'text-white': selectedVersion === v.id
                        }"
                      >
                        TB • {{ v.createdAt }}
                      </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-btn
                      @click="checkout(v)"
                      v-show="codeChanges.length && selectedVersion === v.id && hovering === v.id"
                      size="sm" round dense icon="get_app"
                      class="bg-blue-grey-10"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <q-card
              v-show="!versions.length || (versions.length && versions[0].id === selectedVersion)"
              class="bg-dark text-white absolute-bottom shadow-up-1"
              style="max-width: 300px"
            >
              <q-card-section>
                <div class="text-h6">Staging Deployment</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input dark v-model="data.summary" type="text" label="Summary" />
                <q-input dark v-model="data.description" type="textarea" label="Description" autogrow input-style="min-height: 64px;" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" v-close-popup @click="onDialogCancel" />
                <q-btn :disabled="!data.summary || (!codeChanges.length && versions.length)" flat label="Commit" @click="save" />
              </q-card-actions>
            </q-card>
          </div>

          <div class="col column text-white">
            <div class="shadow-10 row" style="z-index: 4 !important;">
              <q-list dark separator>
                <q-item v-if="currentVersion.summary">
                  <q-item-section>
                    <q-item-label> {{ currentVersion.summary }} </q-item-label>
                    <q-item-label caption>
                      <q-avatar size="24px" color="secondary">TB</q-avatar>
                      <span class="text-blue-grey">
                        {{ currentVersion.autthor }} • {{ currentVersion.createdAt }}
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-space />
              <div class="q-pa-sm">
                <q-btn @click="split = !split"
                  :color="split ? 'blue-grey-10': 'dark'"
                  :text-color="split ? 'secondary' : 'grey'" round
                  :icon="split ? 'compare' : 'difference'"
                />
              </div>
            </div>
            <div class="row col">
              <div class="shadow-24" style="width: 300px; z-index: 3 !important;">
                <q-list dense dark separator>
                  <q-item
                    v-for="c in codeChanges" :key="c.prop"
                    clickable v-ripple
                    :class="{
                      'bg-blue-grey-10 text-white': selectedFile === c.prop
                    }"
                    @click="selectedFile = c.prop"
                  >
                    <q-item-section>
                      <q-item-label caption
                        :class="{
                          'text-white': selectedFile === c.prop,
                          'text-blue-grey': selectedFile !== c.prop
                        }"
                      >
                        {{ c.prop }} {{ changeType(c.prop) }}
                      </q-item-label>
                    </q-item-section>
                     <q-item-section avatar>
                      <div class="row">
                        <q-icon v-if="changeType(c.prop) === 'edited'" size="18px" color="warning" name="change_circle" />
                        <q-icon v-else-if="changeType(c.prop) === 'deleted'" size="18px" color="red" name="remove_circle_outline" />
                        <q-icon v-else size="18px" color="positive" name="add_circle_outline" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col">
                <div ref="editor" class="fit"></div>
              </div>
            </div>
          </div>

        </q-page>
      </q-page-container>

      <q-header elevated class="bg-primary">
        <q-toolbar class="shadow-10">
          <q-btn flat dense icon="history" label="History" />
          <!-- <q-toolbar-title>{{ component.name }} | History</q-toolbar-title> -->
          <q-space />
          <q-badge color="secondary" flat dense no-caps :label="'<&nbsp;' + component.name + ' />'" />
          <q-space />
          <q-btn flat @click="onDialogCancel" v-close-popup round dense icon="close" />
        </q-toolbar>
      </q-header>

      <!-- <q-footer class="bg-dark text-white shadow-up-24">
        <q-toolbar>
          <q-toolbar-title>
          </q-toolbar-title>
          <q-btn disabled color="primary" @click="save" icon="save" label="Checkout"/>
        </q-toolbar>
      </q-footer> -->
    </q-layout>
  </q-dialog>
</template>

<script setup>
/* eslint-disable no-new-func */
import { useDialogPluginComponent } from 'quasar'
import { computed, onBeforeMount, getCurrentInstance, reactive, ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'

const { $likhaAPI, $monaco, $qs } = getCurrentInstance().appContext.config.globalProperties

const props = defineProps(['component', 'codes'])

const editor = ref(null)

const searchText = ref('')

const split = ref(false)

const selectedFile = ref('template')

const selectedVersion = ref('')

const versions = ref([])

const hovering = ref(null)

let diffEditor, leftModel, rightModel

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

const currentVersion = ref({})

watch(split, val => {
  if (diffEditor) {
    diffEditor.updateOptions({
      renderSideBySide: val
    })
  }
})

const getLangByProp = (key) => {
  switch (key) {
    case 'template':
      return 'html'
    case 'style':
      return 'css'
    default:
      return 'javascript'
  }
}

watch(selectedVersion, val => {
  if (diffEditor) {
    const version = versions.value.filter(v => v.id === val)[0]
    currentVersion.value = { ...version }
    const currentCode = props.codes.filter(c => c.prop === selectedFile.value)[0]
    const prevCode = JSON.parse(version.codes)[selectedFile.value]

    const lang = getLangByProp(selectedFile.value)
    $monaco.editor.setModelLanguage(rightModel, lang)
    $monaco.editor.setModelLanguage(leftModel, lang)

    if (currentCode.value === prevCode) {
      rightModel.setValue('')
      leftModel.setValue('')
      return
    }

    rightModel.setValue(currentCode.value)
    leftModel.setValue(prevCode)
  }
})

watch(selectedFile, val => {
  if (diffEditor) {
    const lang = getLangByProp(val)
    $monaco.editor.setModelLanguage(rightModel, lang)
    $monaco.editor.setModelLanguage(leftModel, lang)

    const version = versions.value.filter(v => v.id === selectedVersion.value)[0]

    const currentCode = props.codes.filter(c => c.prop === selectedFile.value)[0]
    const prevCode = JSON.parse(version.codes)[selectedFile.value]

    if (currentCode.value === prevCode) {
      rightModel.setValue('')
      leftModel.setValue('')
      return
    }

    rightModel.setValue(currentCode.value)
    leftModel.setValue(prevCode)
  }
})

function checkout (version) {
  console.log('version', JSON.parse(version.codes))

  // const version = {
  //   component: props.component.id,
  //   summary,
  //   description,
  //   codes: JSON.stringify(versionCode)
  // }

  // await $likhaAPI.post('/versions', {
  //   data: version
  // })

  // console.log(props.codes, dataCode, version)

  onDialogOK(version)
}

function changeType (file) {
  const version = versions.value.filter(v => v.id === selectedVersion.value)[0]

  const currentCode = props.codes.filter(c => c.prop === file)[0]?.value
  const prevCode = JSON.parse(version.codes)[file]

  // console.log('diff', file, prevCode, currentCode)

  if (!prevCode.length) {
    return 'new'
  } else if (prevCode.length && (currentCode.length === 0)) {
    return 'deleted'
  }

  return 'edited'
}

const codeChanges = computed(() => {
  return props.codes.filter(c => hasChanges(c.prop))
})

function hasChanges (file) {
  const version = versions.value.filter(v => v.id === selectedVersion.value)[0]

  if (!version) return

  const currentCode = props.codes.filter(c => c.prop === file)[0]
  const prevCode = JSON.parse(version.codes)[file]

  if (currentCode.value === prevCode) {
    return
  }

  return true
}

onBeforeUnmount(() => {
  leftModel.dispose()
  rightModel.dispose()
  diffEditor.dispose()
})

onBeforeMount(async () => {
  const query = $qs.stringify({
    filters: {
      component: props.component.id
    },
    sort: ['createdAt:desc'],
    pagination: {
      start: 0,
      limit: 15
    }
  })
  versions.value = (await $likhaAPI.get('/versions?' + query))
    .data
    .data
    .map(v => ({
      id: v.id,
      ...v.attributes
    }))
})

onMounted(async () => {
  leftModel = $monaco.editor.createModel('', 'html')
  rightModel = $monaco.editor.createModel('', 'html')

  console.log('trin editor', editor, leftModel, rightModel)
  await nextTick()
  setTimeout(() => {
    diffEditor = $monaco.editor.createDiffEditor(editor.value, {
      readOnly: true,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vs-dark',
      insertSpaces: true,
      tabSize: 2,
      renderSideBySide: false
    })
    diffEditor.setModel({
      original: leftModel,
      modified: rightModel
    })
  }, 300)
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

<style scoped>
.q-list--dark.q-list--separator > .q-item-type + .q-item-type {
  border-top-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
