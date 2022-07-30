<template>
  <q-dialog
    persistent class="z-top" ref="dialogRef" @hide="onDialogHide">
    <q-layout style="max-height: 500px !important;" view="hHh LpR fFf" container class="bg-white">
        <q-header class="bg-dark">
          <q-toolbar>
            <!-- <q-btn flat round dense icon="menu" /> -->
            <q-toolbar-title>{{ component.name }} - {{ component.order }}</q-toolbar-title>
            <!-- <q-btn flat round dense icon="menu" /> -->
            <q-btn flat @click="onDialogCancel" v-close-popup round dense icon="close" />
          </q-toolbar>
        </q-header>

        <q-page-container>
          <q-page padding class="column bg-dark inset-shadow">
            <!-- <div>{{ data.props }}</div>
            <div>{{ component.name }}</div> -->
            <q-input
              dark
             v-for="p in data.props" :key="'prop' + p[0]" :label="p[0]" v-model="p[1].value" :type="(new p[1].type()).constructor.name" />
          </q-page>
        </q-page-container>

        <q-footer class="bg-dark text-white shadow-up-24">
          <q-toolbar>
            <q-toolbar-title>
              <!--  -->
            </q-toolbar-title>
            <q-btn color="primary" @click="save" icon="save" label="save"/>
          </q-toolbar>
        </q-footer>

      </q-layout>
  </q-dialog>
</template>

<script setup>
/* eslint-disable no-new-func */
import { useDialogPluginComponent } from 'quasar'
import { onBeforeMount, getCurrentInstance, reactive } from 'vue'

const { $likhaAPI, $qs } = getCurrentInstance().appContext.config.globalProperties

const props = defineProps(['component', 'env'])

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
])

const data = reactive({
  props: []
})

onBeforeMount(async () => {
  let env = ''
  if (props.env === '/dev-env') env = 'Dev'
  if (props.env === '/staging-env') env = 'Staging'
  const query = $qs.stringify({
    filters: {
      name: {
        $eq: props.component.name
      }
    },
    fields: ['props' + env]
  }, {
    encodeValuesOnly: true
  })
  const { attributes } = (await $likhaAPI.get('/components?' + query)).data.data[0]
  // console.log('propEditor', { id, attributes }, query)

  const addReturnIfNeeded = str => {
    if (typeof str !== 'string') return 'return ' + str
    const firstToken = str.split(/\b\s+/)[0]
    if (firstToken.includes('return')) return str
    return 'return ' + str
  }

  // eslint-disable-next-line no-new-func
  const componentProps = (new Function(addReturnIfNeeded(attributes['props' + env])))() || {}
  // console.log('componentProps', componentProps, props.component['props' + env])

  const propsValue = (props.component['props' + env]) || {}

  const dataType = componentProps.constructor.name
  if (dataType === 'Object') {
    data.props = Object.entries(componentProps).map(p => {
      return [p[0], { value: propsValue[p[0]] || p[1].default, ...p[1] }]
    })
  } else if (dataType === 'Array') {
    data.props = componentProps.map(p => {
      const value = propsValue[p] || ''
      // console.log('propsValue', propsValue, p, propsValue[p])
      return [p, { value, type: String }]
    })
    // console.log('data.props', data.props)
  }

  // console.log('propsValue', propsValue, componentProps, dataType, data.props)
})

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
function save () {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)

  let env = ''
  if (props.env === '/dev-env') env = 'Dev'
  if (props.env === '/staging-env') env = 'Staging'

  const newProps = {}
  for (const p of data.props) {
    if (!newProps['props' + env]) {
      newProps['props' + env] = {}
    }
    newProps['props' + env][p[0]] = p[1].value
  }

  // console.log('newProps', newProps, data.props)

  onDialogOK(newProps)
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
