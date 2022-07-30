/* eslint-disable import/namespace */
import { boot } from 'quasar/wrappers'
import lkComponent from 'components/lkComponent.vue'

import * as $quasar from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // const { $likhaAPI, $qs } = app.config.globalProperties
  app.component('lk-component', lkComponent)
  // something to do

  Object.keys($quasar).forEach(key => {
    if (key[0].toLowerCase() === 'q') {
      // components[key] = $quasar[key]
      app.component(key, $quasar[key])
    } else if (!$quasar[key].template && !$quasar[key].render) {
      // directives[key] = $quasar[key]
      app.directive(key, $quasar[key])
    }
  })
  // const customComponents = [
  //   'q-btn'
  // ]
  // app.config.compilerOptions.isCustomElement = (tag) => customComponents.includes(tag)
})
