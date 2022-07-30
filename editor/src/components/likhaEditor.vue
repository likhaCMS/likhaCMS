<template>
  <q-bar dark class="bg-dark text-white">
    <q-icon name="laptop_chromebook" />
    <div>
      <q-tabs
        v-model="tab"
        no-caps
        active-color="white"
        class="bg-dark text-grey shadow-2"
      >
        <q-tab style="height: 32px; min-height: 32px;" v-for="code in codes" :key="'tab' + code.prop" :name="code.prop" :label="code.prop" />
      </q-tabs>
    </div>

    <q-space />

    <q-btn dense v-show="codeHasChanges" flat round @click="save" icon="save" :loading="loading" />
    <!-- <q-btn dense v-show="minimized" flat icon="crop_square" @click="minimized = false, $emit('restored')" /> -->
    <!-- <q-btn dense flat icon="close" /> -->
  </q-bar>
  <div v-for="(c, i) in modelValue"
    :key="'editor' + ( i || '' )"
    v-show="tab === c.prop && !minimized"
    style="overflow: auto; max-height: 100%; max-width: 100%;" :style="{ height, width: widthEditor, resize }"
   ref="editors"></div>
</template>
<script>
/* eslint-disable new-cap */
import { defineComponent, nextTick } from 'vue'

// import onResize from 'resize-event'

// import * as monaco from 'monaco-editor'

// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// // import DarkPlus from 'components/Dark+theme.json'

// self.MonacoEnvironment = {
//   getWorker (_, label) {
//     if (label === 'json') {
//       return new jsonWorker()
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return new cssWorker()
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return new htmlWorker()
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return new tsWorker()
//     }
//     return new editorWorker()
//   }
// }

export default defineComponent({
  emits: ['saved'],
  props: {
    modelValue: {
      type: Array,
      default () { return [] }
    },
    component: {
      type: Object,
      default: () => ({ id: -1 })
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    resize: {
      type: String,
      default: 'none'
    }
  },
  data () {
    return {
      tab: '',
      loading: false,
      codeHasChanges: false,
      minimized: false,
      widthEditor: this.width,
      monacoEditor: null,
      codes: [],
      monacoStateModels: {}
    }
  },
  watch: {
    modelValue (newVal, oldVal) {
      const arrChanges = []
      for (const code of newVal) {
        // this.codeHasChanges = this['monacoEditor-' + code.prop].model.getValue() !== code.value
        const model = this['monacoEditor-' + code.prop].model
        model.pushEditOperations(
          [],
          [{ range: model.getFullModelRange(), text: code.value }],
          () => null
        )
      }
      for (const code of oldVal) {
        arrChanges.push(this['monacoEditor-' + code.prop].model.getValue() !== code.value)
      }
      this.codeHasChanges = arrChanges.includes(true)
    }
  },
  methods: {
    minimize () {
      // console.log('parent change size', this.parent)
      // this.parent.data.style.height = '20%'
    },
    restore () {
      // console.log('parent change size', this.parent)
      this.parent.data.style.height = '20%'
    },
    async save () {
      const data = {}
      for (const code of this.modelValue) {
        data[code.prop + 'Dev'] = this['monacoEditor-' + code.prop].model.getValue()
      }
      // console.log('saving', this.component.id)
      try {
        this.loading = true
        await this.$likhaAPI.put('/components/' + this.component.id, { data })
        for (const [i, code] of this.modelValue.entries()) {
          this.codes[i].value = this['monacoEditor-' + code.prop].model.getValue()
          // this['monacoEditor-' + code.prop].model.setValue(this.codes[i].value)
        }
        this.codeHasChanges = false
        this.$emit('saved')
      } catch (error) {}
      this.loading = false
    }
  },
  unmounted () {
    for (const code of this.modelValue) {
      this['monacoEditor-' + code.prop].dispose()
    }
  },
  async mounted () {
    // console.log(this.parent = getCurrentInstance().parent)
    // console.log('parent')
    for (const code of this.modelValue) {
      if (this['monacoEditor-' + code.prop]) {
        this['monacoEditor-' + code.prop].model.dispose()
        this['monacoEditor-' + code.prop].dispose()
      }
    }
    // console.log('this.modelValue', this.modelValue)
    this.codes = this.modelValue || []
    await nextTick()
    // console.log('this.codes', this.codes)
    // console.log('this.$refsthis.$refs', this.$refs)
    if (this.codes.length) this.tab = this.codes[0].prop

    // console.log('DarkPlus', DarkPlus)
    // monaco.editor.defineTheme('DarkPlus', DarkPlus)

    for (const [i, code] of this.modelValue.entries()) {
      this['monacoEditor-' + code.prop] = this.$monaco.editor.create(this.$refs.editors[i], {
        value: code.value,
        language: code.language,
        automaticLayout: true,
        // scrollBeyondLastLine: false,
        theme: 'vs-dark',
        insertSpaces: true,
        tabSize: 2
      })

      this['monacoEditor-' + code.prop].model = this['monacoEditor-' + code.prop].getModel()

      // this['monacoEditor-' + code.prop].onKeyDown((e) => {
      //   if (e.keyCode === 83 && (e.metaKey || e.ctrlKey)) {
      //     e.preventDefault()
      //     // Process event...
      //   }
      // })

      // const myCondition1 = this['monacoEditor-' + code.prop].createContextKey('myCondition1', false)

      // this['monacoEditor-' + code.prop].addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function () {
      //   console.log('SAVE pressed!')
      // }, 'myCondition1')

      // myCondition1.set(true)

      this['monacoEditor-' + code.prop].onKeyDown((event) => {
        const { keyCode, ctrlKey, metaKey } = event
        // console.log('pressing', keyCode)
        if ((keyCode === 49) && (metaKey || ctrlKey)) {
          event.preventDefault()
          if (this.codeHasChanges) this.save()
        }
      })

      // this['monacoEditor-' + code.prop].model.setValue('some value')

      this['monacoEditor-' + code.prop].model.onDidChangeContent(() => {
        this.codeHasChanges = this['monacoEditor-' + code.prop].model.getValue() !== this.codes[i].value
        // console.log('content has Change', this.codeHasChanges, this['monacoEditor-' + code.prop].model.getValue(), this.codes[i].value)
      })
    }
  }
})
</script>
