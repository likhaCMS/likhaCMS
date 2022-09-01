/* eslint-disable new-cap */
import { computed, reactive } from 'vue'
import { boot } from 'quasar/wrappers'
import { debounce, LocalStorage } from 'quasar'

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
export default boot(async ({ app, router }) => {
  // something to do
  const { $likhaAPI, $qs } = app.config.globalProperties

  app.component('likha-editor', likhaEditor)
  app.component('likha-iframe', likhaIframe)
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('draggable', draggable)
  app.component(Splitpanes.name, Splitpanes)
  app.component(Pane.name, Pane)

  app.config.globalProperties.$debounce = debounce
  app.config.globalProperties.$JSON5 = JSON5

  app.config.globalProperties.$monaco = monaco

  const $global = reactive({
    dev: LocalStorage.getItem('$likhaDev') || null
  })

  app.config.globalProperties.$global = $global

  window.$setLikhaUser = ({ user, jwt }) => {
    LocalStorage.set('$likhaDev', user)
    LocalStorage.set('$likhaJWT', jwt)

    console.log('$dev', LocalStorage.getItem('$likhaJWT'))

    $global.dev = user
    $likhaAPI.defaults.headers.common.Authorization = 'Bearer ' + jwt
  }

  app.config.globalProperties.$usernameAvatar = computed(() => {
    if ($global.dev) {
      const strs = $global.dev.email.split('.')

      if (!strs[0] || !strs[1]) return $global.dev.email[0] + $global.dev.email[1]

      return (strs[0][0] + strs[1][0]).toUpperCase()
    }

    return ''
  })

  window.$logoutLikhaUser = () => {
    $global.dev = null
    LocalStorage.remove('$likhaDev')
    LocalStorage.remove('$likhaJWT')
    delete $likhaAPI.defaults.headers.common.Authorization
  }
  app.config.globalProperties.$logoutLikhaUser = window.$logoutLikhaUser

  window.$likhaAuthenticate = async () => {
    const $likhaJWT = LocalStorage.getItem('$likhaJWT')
    console.log('authenticating', $likhaJWT)
    if ($likhaJWT) {
      delete $likhaAPI.defaults.headers.common.Authorization
      $likhaAPI.defaults.headers.common.Authorization = 'Bearer ' + $likhaJWT

      try {
        await $likhaAPI.get('/users/me')
        console.log('Authenticated')
      } catch (error) {
        window.$logoutLikhaUser()
        // throw error
      }
    }
  }
  await window.$likhaAuthenticate()

  router.beforeResolve(async (routeTo, routeFrom, next) => {
    console.log('$router', routeTo)

    if (routeTo.query?.access_token && window.opener) {
      // asd
      try {
        const { data } = await $likhaAPI.get('/auth/github/callback?' + $qs.stringify(routeTo.query))
        window.opener.$setLikhaUser(data)
        window.close()
      } catch (error) {
        next()
      }
      return
    }
    next()
  })

  app.config.globalProperties.$popupCenter = ({ url, title, w, h }, listener) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height

    const systemZoom = width / window.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    )

    if (window.focus) newWindow.focus()

    // newWindow.onblur = newWindow.close

    window.removeEventListener('message', listener, false)
    window.addEventListener('message', e => {
      if (e.origin !== window.location.host) return

      listener(e.data)
    }, false)

    return newWindow
  }
})
