<template>
  <component :is="cmpt" v-bind="props"  />
</template>
<script>
/* eslint-disable no-new-func */
import { defineComponent, getCurrentInstance, ref } from 'vue'
import { useRoute } from 'vue-router'

// import { JSDOM } from 'jsdom'
// const document = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

// console.log('getCurrentInstance()', getCurrentInstance())

let comp = {}

export default defineComponent({
  name: 'LkComponent',
  props: {
    name: {
      type: String,
      required: true
    },
    props: {
      type: Object,
      default: () => ({})
    },
    class: [Object, String]
  },
  async setup (props) {
    const lkComponent = getCurrentInstance()
    const { $likhaAPI, $qs } = lkComponent.appContext.config.globalProperties
    const refComp = ref(null)
    let area = ''

    const $route = useRoute()

    // console.log('propsPogi', props)

    const query = $qs.stringify({
      filters: {
        name: {
          $eq: props.name
        }
      },
      populate: ['components'],
      pagination: {
        start: 0,
        limit: 10
      }
    }, {
      encodeValuesOnly: true
    })

    try {
      comp = (await $likhaAPI.get('/components?' + query)).data.data[0].attributes
      // console.log('props.name', $route.path, comp)

      let env = $route.path.split('/')[1].split('-')[0]
      switch (env) {
        case 'dev':
          break
        case 'staging':
          break
        default:
          env = ''
          break
      }
      const Env = env.charAt(0).toUpperCase() + env.slice(1)
      // console.log('env', Env, comp['data' + Env])

      const addReturnIfNeeded = str => {
        if (typeof str !== 'string') return 'return ' + str
        const firstToken = str.split(/\b\s+/)[0]
        if (firstToken.includes('return')) return str
        return 'return ' + str
      }

      area = 'props' + Env
      const props = (new Function(addReturnIfNeeded(comp[area])))() || []
      area = 'emits' + Env
      const emits = (new Function(addReturnIfNeeded(comp['emits' + Env])))() || []
      area = 'data' + Env
      const data = (new Function(addReturnIfNeeded(comp[area])))
      area = 'computed' + Env
      const computed = (new Function(addReturnIfNeeded(comp['computed' + Env])))() | {}
      area = 'methods' + Env
      const methods = (new Function(addReturnIfNeeded(comp[area])))() || {}
      area = 'lifeCycleEvents' + Env
      const lifeCycleEvents = (new Function(addReturnIfNeeded(comp[area])))() || {}

      area = 'quasarComponents' + Env

      const cmptStructure = {
        name: comp.name,
        template: `
            <component scoped scopped is="style" component="${comp.name}">
              ${comp['style' + Env]}
            </component>
            ${comp['template' + Env]}
        `,
        props,
        emits,
        data,
        computed,
        methods,
        ...lifeCycleEvents
      }

      // console.log('lkComponent', lkComponent)

      // const style = ref(comp['style' + Env])

      // console.log('cmptStructure', cmptStructure)

      const cmpt = defineComponent(cmptStructure)

      // console.log('cmpt', cmpt, lkComponent)

      // console.log('process.env.CLIENT', process.env.CLIENT)

      return {
        refComp,
        cmpt
      }
    } catch (error) {
      // let env = $route.path.split('/')[1].split('-')[0]
      // switch (env) {
      //   case 'dev':
      //     break
      //   case 'staging':
      //     break
      //   default:
      //     env = ''
      //     break
      // }
      // const Env = env.charAt(0).toUpperCase() + env.slice(1)
      // console.log('attributes', comp)
      console.error('Component Error:', props.name)
      // console.error('Env:', Env || 'Prod')
      console.error('Area:', area)
      console.error(error)
      console.trace()
      return {
        refComp,
        cmpt: defineComponent({
          data: () => ({
            component: `<${props.name} />`
          }),
          template: '<div class="bg-red">{{component}}</div>',
          mounted () {

          }
        }),
        style: ''
      }
    }
  },
  mounted () {
    // console.log('refComp', this.$refs.refComp)
    // console.log('style', this.style)
    if (process.env.CLIENT) {
      // const style = this.style
      // const styleComp = document.createElement('style')
      // styleComp.type = 'text/css'
      // styleComp.setAttributeNode(document.createAttribute('scopped'))
      // styleComp.setAttributeNode(document.createAttribute('scoped'))
      // styleComp.appendChild(document.createTextNode(style))
      // console.log('this.$refs.refComp', this.$refs.refComp)
      // this.$refs.refComp.$el.appendChild(styleComp)
      // console.log('this.$refs.refComp.$el', this.$refs.refComp.$el)

      // const env = this.$route.path.split('/')[1].split('-')[0]
      // const Env = env.charAt(0).toUpperCase() + env.slice(1)
      // console.log('env', Env)

      if (window.parent) {
        const getHeight = () => {
          const body = document.body,
            html = document.documentElement

          const height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight)

          let env = this.$route.path.split('/')[1].split('-')[0]
          switch (env) {
            case 'dev':
              break
            case 'staging':
              break
            default:
              env = ''
              break
          }

          return {
            height,
            name: this.name,
            env
          }
        }

        window.parent.postMessage(getHeight(), '*')
        // console.og('getHeight()', getHeight())
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            window.parent.postMessage(getHeight(entry), '*')
          }
        })

        observer.observe(document.body)
      }
    }
  }
})
</script>

<!--
  template

name --
props --
emits --

data --
computed --
watch --

methods --

Life cycle events
- beforeMount
- mounted

css
 -->
