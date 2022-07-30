/* eslint-disable no-new-func */
import { boot } from 'quasar/wrappers'
import { defineComponent, reactive } from 'vue'
import { orderBy } from 'lodash'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
  const { $likhaAPI, $qs } = app.config.globalProperties

  const query = $qs.stringify({
    populate: ['component']
  }, {
    encodeValuesOnly: true
  })

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

  app.config.globalProperties.$global = reactive((new Function(addReturnIfNeeded(variables)))())
  // console.log('variables', variables)

  const pages = (await $likhaAPI.get('/pages?' + query)).data.data
  pages.map((p) => {
    const { name, path, template } = p.attributes

    // const lkPageComponents = defineComponent({
    //   name: 'lkPageComponents',
    //   data: () => ({
    //     components: orderBy((new Function('return ' + components))(), ['index'], ['asc']),
    //     env: ''
    //   }),
    //   created () {
    //     this.env = this.$route.path.split('/')[1].split('-')[0]
    //     this.env = this.env.charAt(0).toUpperCase() + this.env.slice(1)
    //   },
    //   template: `
    //     <lk-component  v-for="(c, i) in components" :key="c.name+'-'+i" :name="c.name" :class="c.class" :props="{ ...c['props' + env] }" />
    //   `
    // })

    const components = {}
    const layoutParts = [
      'header',
      'left',
      '',
      'right',
      'footer'
    ]

    layoutParts.forEach(part => {
      const name = 'lkPage' + part.charAt(0).toUpperCase() + part.slice(1) + 'Components'
      let partComponents = 'components'
      if (part) partComponents = part + 'Components'
      // console.log('nnn', name, partComponents, p.attributes[partComponents])
      components[name] = defineComponent({
        name,
        data: () => ({
          components: orderBy((new Function(addReturnIfNeeded(p.attributes[partComponents])))() || [], ['index'], ['asc']),
          env: ''
        }),
        created () {
          this.env = this.$route.path.split('/')[1].split('-')[0]
          this.env = this.env.charAt(0).toUpperCase() + this.env.slice(1)
        },
        template: `
          <lk-component  v-for="(c, i) in components" :key="c.name+'-'+i" :name="c.name" :class="c.class" :props="{ ...c['props' + env] }" />
        `
      })
    })

    // console.log('components', components)

    const component = defineComponent({
      components,
      name: 'lk-' + name + '-page',
      created () {
        // console.log('page components', this.components)
        this.env = this.$route.path.split('/')[1].split('-')[0]
        this.env = this.env.charAt(0).toUpperCase() + this.env.slice(1)
        // for (const c of this.components) {
        //   console.log('c', this.env, c, c['props' + this.env])
        // }
      },
      template: template || '<lk-page-components />'
    })

    const r = {
      path,
      name: path,
      component
    }
    const rStaging = {
      path: '/staging-env' + path,
      name: '/staging-env' + path,
      component
    }
    const rDev = {
      path: '/dev-env' + path,
      name: '/dev-env' + path,
      component
    }

    router.addRoute(r)
    router.addRoute(rStaging)
    router.addRoute(rDev)

    return r
  })
  // console.log('routes', routes)
  // router

  // PREVIEW

  const component = defineComponent({
    name: 'lk-preview',
    created () {
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
      // const Env = env.charAt(0).toUpperCase() + env.slice(1)
      // console.log('lk-preview ' + Env, this.$route.params.name)
      if (process.browser) {
        this.props = this.$qs.parse(window.location.search.replace('?', '')).lkProps
      } else {
        const search = this.$route.fullPath.replace('?', 'lkSep').split('lkSep')[1]
        if (search) {
          this.props = this.$qs.parse(this.$route.fullPath.replace('?', 'lkSep').split('lkSep')[1]).lkProps
        }
      }
      // console.log('lkProps ' + Env, this.$qs.parse(window.location.search.replace('?', '')))
    },
    data () {
      return {
        props: {}
      }
    },
    template: `
      <div>
        <lk-component :name="$route.params.name" :props="{ ...props }" />
      </div>
    `
  })

  const path = '/lk-preview/:name'

  const r = {
    path,
    name: path,
    component
  }
  const rStaging = {
    path: '/staging-env' + path,
    name: '/staging-env' + path,
    component
  }
  const rDev = {
    path: '/dev-env' + path,
    name: '/dev-env' + path,
    component
  }

  router.addRoute(r)
  router.addRoute(rStaging)
  router.addRoute(rDev)
})
