<template>
  <q-layout view="lhh LpR lfr">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar class="bg-primary text-white">
      <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      <!-- <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar> -->

        <q-toolbar-title>
          <q-select
            ref="qSelect"
            dark
            filled
            v-model="componentName"
            :options="components"
            use-input
            hide-selected
            fill-input
            :loading="loading"
            @filter="filterComponents"
            @input-value="getComponents"
            style="max-width: 300px;"
            @update:model-value="(val) => {
              getComponent(val)
              $refs.qSelect.blur()
              $updateURL('/component-editor/' + val)
              getComponents()
            }"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-toolbar-title>

        <!-- <q-btn flat round dense icon="whatshot" /> -->
        <span class="q-gutter-sm">
          <!-- <q-btn icon="history" label="History" @click="showHistory" /> -->
          <q-btn icon="language" label="Global Props | Functions" @click="showGlobalEditor" />
          <!-- <q-btn icon="approval" label="HELPER Functions" /> -->
          <q-btn icon="approval" label="stage" @click="showHistory" :loading="loading" v-show="env === '/dev-env'" />
          <q-btn icon="precision_manufacturing" label="Publish" @click="publish" v-show="env === '/staging-env'" />
          <q-btn v-if="$global.dev" round :label="$usernameAvatar.value" dark color="blue-grey-10" class="text-light-blue" >
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item >
                  <q-item-section>
                    {{ $global.dev.email }}
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item @click="$logoutLikhaUser" clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-else icon="fa-brands fa-github" label="Login" dark color="blue-grey-10" class="text-light-blue"
            @click="$popupCenter({url: $likhaAPI.defaults.baseURL + '/connect/github', title: 'LikhaCMS Login', w: 900, h: 600})"
          />

        </span>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="row bg-pink" style="height: calc(100vh - 56px); max-height: calc(100vh - 56px);">
        <splitpanes class="default-theme bg-dark">
          <pane min-size="20">
            <splitpanes horizontal>
              <pane min-size="20">
                <!-- {{ component.id }} -->
                <likha-editor v-if="code1.length" v-model="code1" height="100%" :component="component" @update:modelValue="reloadPreview()" />
              </pane>
              <pane min-size="20">
                <!-- {{component}} -->
                <likha-editor v-if="code2.length" v-model="code2" height="100%" :component="component" @update:modelValue="reloadPreview()" />
              </pane>
            </splitpanes>
          </pane>
          <pane min-size="20">
            <splitpanes horizontal>
              <pane min-size="20" size="30">
                <likha-editor v-if="code3.length" v-model="code3" height="100%" :component="component" @update:modelValue="reloadPreview()" />
              </pane>
              <pane min-size="20" class="bg-dark col column">
                <div class="row">
                  <q-input class="col" input-class="q-pa-md" dark dense v-model="query" placeholder="query params" />
                  <q-tabs class="bg-dark text-white" align="right" dense v-model="env">
                    <q-tab name="/dev-env" label="dev" />
                    <q-tab name="/staging-env" label="staging" />
                    <q-tab name="" label="prod" />
                  </q-tabs>
                </div>
                <!-- <div class="text-white"> {{ '/dev-env/lk-preview/' + component.name + '?' + query }} </div> -->
                <iframe v-if="component" ref="iframe" :src="$previewHost + env + '/lk-preview/' + component.name + '?' + query" class="col bg-white" frameborder="0"></iframe>
              </pane>
            </splitpanes>
          </pane>
        </splitpanes>
        <!-- <div class="col">
          <likha-editor height="calc((100vh - 56px)/2);" resize="vertical" />
          <likha-editor height="calc((100vh - 56px)/2);" resize="vertical" />
        </div> -->
        <!-- <div style="overflow: auto; height: 100%; resize:horizontal" :style="{ width }" ref="editor"></div> -->
        <!-- <div class="col">{{ width }}</div> -->
      </div>
    </q-page-container>
    <q-drawer v-model="leftDrawerOpen" side="left" elevated @mouseleave="leftDrawerOpen = false">
      <essential-link />
    </q-drawer>
  </q-layout>
</template>
<script>
import { defineComponent, ref } from 'vue'
import globalEditor from 'components/globalEditor.vue'
import lkHistory from 'components/lkHistory.vue'
import stagingDeploy from 'components/stagingDeploy.vue'
import EssentialLink from 'components/EssentialLink.vue'
// 'components/stagingDeploy.vue'

export default defineComponent({
  components: {
    // likhaEditor
    EssentialLink
  },
  unmounted () {
    this.debounce.cancel()
  },
  async beforeMount () {
    const { name } = this.$route.params
    await this.getComponent(name)
    this.getComponents()
    // const { id, attributes } = (await this.$likhaAPI.get('/components?' + query)).data
    // this.components = await this.$likhaAPI.get('/components?' + query)).data
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        // rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  },
  data: () => ({
    loading: true,
    width: '50%',
    component: null,
    componentName: '',
    code1: [],
    code2: [],
    code3: [],
    components: ['asd', 'qwe'],
    code: '{}',
    query: '',
    env: '/dev-env'
  }),
  methods: {
    async showGlobalEditor () {
      this.$q.dialog({
        component: globalEditor
      }).onOk((vars) => {
        console.log('vars', vars)
      }).onCancel(() => {
        console.log('closed')
        this.reloadPreview()
      })
    },
    async showHistory () {
      this.$q.dialog({
        component: lkHistory,

        // props forwarded to your custom component
        componentProps: {
          component: this.component,
          codes: [...this.code1, ...this.code2, ...this.code3]
          // ...more..props...
        }
      }).onOk((version) => {
        this.env = '/dev-env'
        this.$q.notify({
          position: 'top-right',
          color: 'positive',
          icon: 'verified',
          message: `Checked out: ${version.summary}`
        })

        setTimeout(() => {
          this.code1 = []
          this.code2 = []
          this.code3 = []

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

          const comp = JSON.parse(version.codes)

          const getByProps = (keys) => keys.map(key => ({
            prop: key,
            value: comp[key] || '',
            language: getLangByProp(key)
          }))

          this.code1 = getByProps(['template', 'data'])
          // console.log('this.code1', this.code1)
          this.code2 = getByProps(['methods', 'computed', 'lifeCycleEvents'])
          // console.log('this.code2', this.code2)
          this.code3 = getByProps(['props', 'emits', 'style'])
        }, 500)
      })
    },
    async publish () {
      this.env = '/staging-env'
      this.$q.dialog({
        dark: true,
        title: 'Confirm Deployment',
        message: 'Are you sure you want to publish ' + this.component.name + ' now?',
        cancel: true,
        ok: {
          color: 'negative',
          label: 'Publish'
          // flat: true
        },
        focus: 'none',
        persistent: true
      }).onOk(async () => {
        const query = this.$qs.stringify({
          filters: {
            component: this.component.id
          },
          sort: ['createdAt:desc'],
          pagination: {
            start: 0,
            limit: 1
          }
        })
        const { id: versionID, attributes: version } = (await this.$likhaAPI.get('/versions?' + query)).data.data[0]

        await this.$likhaAPI.put('/components/' + this.component.id, {
          data: JSON.parse(version.codes)
        })
        // const { id, attributes } = (await this.$likhaAPI.get('/components?' + query)).data.data[0]

        const release = {
          component: this.component.id,
          version: versionID
        }

        // console.log('release', release, version.codes)

        this.env = ''

        await this.$likhaAPI.post('/releases', {
          data: release
        })

        this.$q.notify({
          position: 'top-right',
          color: 'positive',
          icon: 'verified',
          message: 'Deployed to Production!'
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    async stage () {
      this.env = '/dev-env'
      this.$q.dialog({
        component: stagingDeploy,

        // props forwarded to your custom component
        componentProps: {
          component: this.component,
          codes: [...this.code1, ...this.code2, ...this.code3]
          // ...more..props...
        }
      }).onOk((data) => {
        this.env = '/staging-env'
        this.$q.notify({
          position: 'top-right',
          color: 'positive',
          icon: 'verified',
          message: 'Deployed to Staging'
        })
      })
    },
    async getComponents (name) {
      this.loading = true
      const filters = {}
      if (name) {
        filters.$or = [
          {
            name: { $containsi: name }
          },
          {
            templateDev: { $containsi: name }
          },
          {
            templateStaging: { $containsi: name }
          },
          {
            template: { $containsi: name }
          }
        ]
      }
      const query = this.$qs.stringify({
        filters,
        sort: ['name:desc'],
        pagination: {
          start: 0,
          limit: 10
        }
      })
      this.debounce = this.$debounce(async () => {
        this.components = (await this.$likhaAPI.get('/components?' + query)).data.data.map(c => c.attributes.name)
        // console.log('getComponents', this.components)
      }, 1250)
      this.debounce()
      this.loading = false
    },
    async getComponent (name) {
      this.component = null
      this.code1 = []
      this.code2 = []
      this.code3 = []
      this.loading = true
      if (name) {
        const query = this.$qs.stringify({
          filters: {
            name: {
              $eq: name
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
        const { id, attributes } = (await this.$likhaAPI.get('/components?' + query)).data.data[0]
        const comp = this.component = { id, ...attributes }
        this.componentName = comp.name
        // console.log('Code Component', this.component)

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
        const Env = 'Dev'
        const getByProps = (keys) => keys.map(key => ({
          prop: key,
          value: comp[key + Env] || '',
          language: getLangByProp(key)
        }))

        this.code1 = getByProps(['template', 'data'])
        // console.log('this.code1', this.code1)
        this.code2 = getByProps(['methods', 'computed', 'lifeCycleEvents'])
        // console.log('this.code2', this.code2)
        this.code3 = getByProps(['props', 'emits', 'style'])
      }
      this.loading = false
    },
    async reloadPreview () {
      // console.log('iframe this.$refs', this.$refs)
      const previousPage = this.$refs.iframe.src
      await this.$nextTick()
      this.$refs.iframe.src = ''
      await this.$nextTick()
      this.$refs.iframe.src = previousPage
    },
    filterComponents (val, update, abort) {
      // update(() => {
      //   const needle = val.toLocaleLowerCase()
      //   this.components = this.components.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
      // })
      update(() => {
        // this.components = this.components
      })
    }
  }
})
</script>

<style>
.splitpanes--vertical > .splitpanes__splitter {
  border: 0px !important;
  background-color: var(--q-primary) !important;
  width: 4px !important;
}

.splitpanes--horizontal > .splitpanes__splitter {
  border: 0px !important;
  height: 4px !important;
  background-color: var(--q-primary) !important;
}

.splitpanes__pane {
  background-color: inherit !important;
}

.shell__status-bar {
  display: none !important;
}
</style>
