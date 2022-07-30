/* eslint-disable new-cap */
import { boot } from 'quasar/wrappers'
import { debounce } from 'quasar'
import likhaEditor from 'components/likhaEditor.vue'
import likhaIframe from 'components/likhaIframe.vue'
import draggable from 'vuedraggable'

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import JSON5 from 'json5'

import * as monaco from 'monaco-editor'

import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
// import DarkPlus from 'components/Dark+theme.json'

self.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

// import Shell from 'shell.js'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.component('likha-editor', likhaEditor)
  app.component('likha-iframe', likhaIframe)
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('draggable', draggable)
  app.component(Splitpanes.name, Splitpanes)
  app.component(Pane.name, Pane)

  app.config.globalProperties.$debounce = debounce
  app.config.globalProperties.$JSON5 = JSON5

  app.config.globalProperties.$monaco = monaco
})
