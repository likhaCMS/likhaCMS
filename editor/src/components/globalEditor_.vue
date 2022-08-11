<template>
  <q-layout view="Lhh lpR fff" container class="bg-white">
    <q-page-container>
      <q-page class="bg-dark row" style="overflow: hidden; max-height: calc(100vh - 150px) !important;">
        <div class="col">
          <div ref="editor" class="fit"></div>
        </div>
      </q-page>
    </q-page-container>

    <q-header class="bg-secondary shadow-15">
      <q-toolbar>
        <q-btn flat round dense icon="dashboard" />
        <q-toolbar-title>
          Page Layout
          <q-btn color="info" flat dense round icon="help_outline" @click="openBuilder"/>
        </q-toolbar-title>
        <q-space />
        <!-- <q-btn flat round dense icon="menu" /> -->
        <q-btn flat v-close-popup round dense icon="close" />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-dark text-white shadow-up-10">
      <q-toolbar>
        <!-- <q-toolbar-title>Footer</q-toolbar-title> -->
        <div class="q-gutter-md">
          <q-chip color="green" text-color="white" label="<lk-page-components />" />
          <q-chip color="purple" text-color="white" label="<lk-page-[ left / right ]-components />" />
          <q-chip color="cyan" text-color="white" label="<lk-page-[ header / footer ]-components />" />
        </div>
        <q-space />
        <q-btn :disabled="!templateHasChanges" color="secondary" icon="save" label="save" @click="save" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  beforeUnmount () {
    document.removeEventListener('keydown', this.ctrlSave)

    this.editor.model.dispose()
    this.editor.dispose()
  },
  mounted () {
    document.addEventListener('keydown', this.ctrlSave)

    let variables = '{}'

    try {
      variables = (await $likhaAPI.get('/global-property')).data.data.attributes.variables
    } catch (e) {
      console.log('No Global Variables', e)
    }

    const addReturnIfNeeded = str => {
      if (typeof str !== 'string') return 'return ' + str
      const firstToken = str.split(/\b\s+/)[0]
      if (firstToken.includes('return')) return str
      return 'return ' + str
    }

    variables

    if (this.editor) {
      this.editor.model.dispose()
      this.editor.dispose()
    }

    this.variables = variables

    this.editor = this.$monaco.editor.create(this.$refs.editor, {
      value: variables,
      language: 'html',
      automaticLayout: true,
      scrollBeyondLastLine: false,
      theme: 'vs-dark'
    })

    this.editor.onKeyDown((event) => {
      const { keyCode, ctrlKey, metaKey } = event
      // console.log('pressing', keyCode)
      if ((keyCode === 49) && (metaKey || ctrlKey)) {
        event.preventDefault()
        if (this.templateHasChanges) this.save()
      }
    })

    this.editor.model = this.editor.getModel()

    this.editor.model.onDidChangeContent(() => {
      this.templateHasChanges = this.editor.model.getValue() !== variables
      // console.log('content has Change', this.codeHasChanges, this['monacoEditor-' + code.prop].model.getValue(), this.codes[i].value)
    })
  },
  data () {
    return {
      variables: '{}'
    }
  }
}
</script>
