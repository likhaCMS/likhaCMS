<template>
  <q-layout view="hHr LpR lfr">
    <q-header elevated class="bg-dark text-white" height-hint="98">
      <q-toolbar class="shadow-6">
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-select ref="qSelect"
            dark filled standout
            style="max-width: 300px; height: 50px;"
            v-model="page.name"
            :options="pages" use-input hide-selected fill-input
            :loading="loading" @filter="(val, update, abort) => update(() => {})" @input-value="getPages"
            @popup-show="getPages"
            @update:model-value="async (val) => {
              await getPage(val)
              $refs.qSelect.blur()
              $updateURL('/page-editor/' + val)
              getPages()
            }">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-toolbar-title>

        <!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
        <q-btn dense icon="preview" label="preview" @click="preview" />
        <q-btn :disabled="!hasChanges" dense icon="save" label="save" @click="save" />
      </q-toolbar>
      <div class="row">
        <q-input v-model="page.path" readonly dense dark label="path" class="q-ma-sm" />
        <q-space />
        <q-btn icon="dashboard" label="Page Layout" @click="openTemplateEditor" class="q-pr-md" flat color="secondary" dense />
        <q-tabs align="right" dense v-model="env">
          <q-tab name="/dev-env" label="dev" />
          <q-tab name="/staging-env" label="staging" />
          <q-tab name="" label="prod" />
        </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <div class="column">
        <!-- workarea -->
        <div class="column" >
          <!-- HEADER -->
          <draggable
            class="dragArea list-group items-center"
            :class="{
              'q-gutter-md q-ma-sm bg-cyan-2 q-pa-sm min-size': dragging
            }"
            ghost-class="ghost"
            handle=".handle"
            v-if="page.headerComponents"
            v-model="page.headerComponents"
            item-key="name"
            :group="{ name: 'pageComponents', pull: true, put: true }"
            @start="dragging = true" @end="dragging = false" :move="checkMove"
            @change="change => changedComponents(change, 'headerComponents')">
            <template #item="{ element, index }">
              <likha-iframe
                v-model="page.headerComponents[index]"
                class="list-group-item col"
                :class="{
                  'max-height-100': dragging
                }"
                :env="env" :component="element" :dragging="dragging"
                @remove="removeComponent(element.name, index, 'headerComponents')" />
            </template>
          </draggable>
          <!-- HEADER END -->
        </div>
        <div class="row">
          <div class="left-drawer column" >
            <!-- left drawer -->
            <draggable
              class="dragArea list-group items-center"
              :class="{
                'q-gutter-md q-ma-sm bg-purple-2 q-pa-sm min-size': dragging
              }"
              ghost-class="ghost"
              handle=".handle"
              v-model="page.leftComponents"
              item-key="name"
              :group="{ name: 'pageComponents', pull: true, put: true }"
              @start="dragging = true" @end="dragging = false" :move="checkMove"
              @change="change => changedComponents(change, 'leftComponents')">
              <template #item="{ element, index }">
                <likha-iframe
                  v-model="page.leftComponents[index]"
                  class="list-group-item col"
                  :class="{
                    'max-height-100': dragging
                  }"
                  :env="env" :component="element" :dragging="dragging"
                  @remove="removeComponent(element.name, index, 'leftComponents')" />
              </template>
            </draggable>
            <!-- left drawer END -->
          </div>
          <div class="page-container col column text-center">
            <!-- PAGE CONTAINER -->
            <draggable
              class="dragArea list-group items-center"
              :class="{
                'q-gutter-md q-ma-sm bg-green-2 q-pa-sm min-size': dragging
              }"
              ghost-class="ghost"
              handle=".handle"
              v-model="page.components"
              item-key="name"
              :group="{ name: 'pageComponents', pull: true, put: true }"
              @start="dragging = true" @end="dragging = false" :move="checkMove"
              @change="change => changedComponents(change, 'components')">
              <template #item="{ element, index }">
                <likha-iframe
                  v-model="page.components[index]"
                  class="list-group-item col"
                  :class="{
                    'max-height-100': dragging
                  }"
                  :env="env" :component="element" :dragging="dragging"
                  @remove="removeComponent(element.name, index, 'components')" />
              </template>
            </draggable>
            <!-- PAGE CONTAINER END -->
          </div>
          <div class="column" >
            <!-- RIGHT drawer -->
            <draggable
              class="dragArea list-group items-center"
              :class="{
                'q-gutter-md q-ma-sm bg-purple-2 q-pa-sm min-size': dragging
              }"
              ghost-class="ghost"
              handle=".handle"
              v-model="page.rightComponents"
              item-key="name"
              :group="{ name: 'pageComponents', pull: true, put: true }"
              @start="dragging = true" @end="dragging = false" :move="checkMove"
              @change="change => changedComponents(change, 'rightComponents')">
              <template #item="{ element, index }">
                <likha-iframe
                  v-model="page.rightComponents[index]"
                  class="list-group-item col"
                  :class="{
                    'max-height-100': dragging
                  }"
                  :env="env" :component="element" :dragging="dragging"
                  @remove="removeComponent(element.name, index, 'rightComponents')" />
              </template>
            </draggable>
            <!-- RIGHT drawer END -->
          </div>
        </div>
        <div class="column" >
          <!-- FOOTER -->
          <draggable
            class="dragArea list-group items-center"
            :class="{
              'q-gutter-md q-ma-sm bg-cyan-2 q-pa-sm min-size': dragging
            }"
            ghost-class="ghost"
            handle=".handle"
            v-model="page.footerComponents"
            item-key="name"
            :group="{ name: 'pageComponents', pull: true, put: true }"
            @start="dragging = true" @end="dragging = false" :move="checkMove"
            @change="change => changedComponents(change, 'footerComponents')">
            <template #item="{ element, index }">
              <likha-iframe
                v-model="page.footerComponents[index]"
                class="list-group-item col"
                :class="{
                  'max-height-100': dragging
                }"
                :env="env" :component="element" :dragging="dragging" @remove="removeComponent(element.name, index, 'footerComponents')" />
            </template>
          </draggable>
          <!-- FOOTER END -->
        </div>
      </div>
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="column col">
      <div class="absolute-top" style="height: 50px;">
        <q-toolbar class="bg-dark text-white col">
          <q-input dark dense standout
          v-model="searchText"
          @update:model-value="getComponents"
          class="col" input-class="text-right">
            <template v-slot:append>
              <q-icon v-if="searchText === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="searchText = ''" />
            </template>
          </q-input>
        </q-toolbar>
      </div>
      <q-scroll-area class="inset-shadow bg-grey-10" style="height: calc(100% - 50px); margin-top: 50px;">
        <div class="q-pa-md">
          <draggable
            class="dragArea list-group q-gutter-md"
            ghost-class="ghost"
            :clone="clone"
            :list="this.components"
            :group="{ name: 'pageComponents', pull: 'clone', put: false }"
            item-key="name"
            @start="dragging = true" @end="dragging = false"
          >
            <template #item="{ element }">
              <div class="list-group-item">
                <!-- {{ element.name }} -->
                <!-- <likha-iframe :env="env" :component="element" :dragging="dragging" /> -->
                <q-card>
                  <div style="height: 150px">
                    <!-- <iframe
                      class="shadow-transition fit"
                      :src="$previewHost + env + '/lk-preview/' + element.name" frameborder="0">
                    </iframe > -->
                    <iframe
                      class="shadow-transition fit"
                      :srcdoc='`
                        <iframe src="${$previewHost + env + "/lk-preview/" + element.name}" frameborder="0"
                          style="
                            -ms-transform: scale(0.80);
                            -moz-transform: scale(0.80);
                            -o-transform: scale(0.80);
                            -webkit-transform: scale(0.80);
                            transform: scale(0.80);

                            -ms-transform-origin: 0 0;
                            -moz-transform-origin: 0 0;
                            -o-transform-origin: 0 0;
                            -webkit-transform-origin: 0 0;
                            transform-origin: 0 0;
                          "
                          onload="function fnName () { ${code} }; fnName()"
                        ></iframe>
                      `'>
                    </iframe>
                    <div
                      style="
                        background-color: rgba(0, 0, 0, 0.7);
                        backdrop-filter: blur(4px);
                        -webkit-backdrop-filter: blur(4px);
                      "
                      class="text-white handle absolute-bottom text-subtitle2 text-center q-pa-md"
                    >
                      {{ element.name }}
                    </div>
                  </div>
                </q-card>
              </div>
            </template>
          </draggable>
        </div>
      </q-scroll-area>
    </q-drawer>

  </q-layout>

  <q-dialog v-model="showPageTemplate" full-width>
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
  </q-dialog>

</template>

<script>
/* eslint-disable no-new-func */
/* eslint-disable vue/no-parsing-error */
import { ref } from 'vue'

export default {
  beforeUnmount () {
    document.removeEventListener('keydown', this.ctrlSave)

    this.editor.model.dispose()
    this.editor.dispose()
  },
  mounted () {
    document.addEventListener('keydown', this.ctrlSave)
  },
  async beforeMount () {
    const { name } = this.$route.params
    this.getComponents()
    this.getPages()
    await this.getPage(name)
  },
  computed: {
    hasChanges () {
      // console.log('orig', this.page.origComponents)
      let changes = JSON.stringify(this.page.headerComponents)
      changes += JSON.stringify(this.page.leftComponents)
      changes += JSON.stringify(this.page.components)
      changes += JSON.stringify(this.page.rightComponents)
      changes += JSON.stringify(this.page.footerComponents)
      // console.log('change []', this.page.origComponents)
      return this.page.origComponents !== changes
    }
  },
  methods: {
    preview () {
      window.open(this.$previewHost + this.env + this.page.path, '_blank').focus()
    },
    openBuilder () {
      // https://quasar.dev/layout-builder
      window.open('https://quasar.dev/layout-builder', '_blank').focus()
    },
    removeComponent (name, index, keyComponents) {
      this.$q.dialog({
        title: 'Remove Component',
        message: `Would you like remove <${name} /> ?`,
        focus: 'none',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.page[keyComponents].splice(index, 1)
        this.page[keyComponents] = this.page[keyComponents].map((c, i) => ({ ...c, order: i }))
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    async clone (c) {
      // console.log('clone', c)
      this.clonedComponent = {
        name: c.name,
        props: {}
      }
    },
    async getPages (name) {
      // console.log('getting pages 1', name)
      this.loading = true
      const filters = {}
      if (name) {
        filters.$or = [
          {
            name: { $containsi: name }
          },
          {
            path: { $containsi: name }
          },
          {
            components: { $containsi: name }
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
        this.pages = (await this.$likhaAPI.get('/pages?' + query)).data.data.map(c => c.attributes.name)
        // console.log('getPages', name, this.pages)
        // console.log('getting pages 2', name)
      }, 1250)
      this.debounce()
      this.loading = false
    },
    async changedComponents (change, keyComponents) {
      // console.log('changes', keyComponents, change)
      if (change.moved) {
        const i = this.page[keyComponents].findIndex(c => {
          return c.name !== change.moved.element.name &&
          c.order === change.moved.newIndex
        })
        this.page[keyComponents][i].order = i
      }
      if (change.added) {
        // console.log('element', change.added.element)

        if (this.clonedComponent) {
          const { name, props } = this.clonedComponent

          const newArr = [
            {
              name,
              props,
              order: change.added.newIndex
            }, ...this.page[keyComponents]
          ]
            .filter(c => c.name)
            .sort((a, b) => a.order - b.order)
            .map((c, i) => ({ ...c, order: i }))

          this.page[keyComponents] = newArr

          delete this.clonedComponent

          return
        }

        this.page[keyComponents] = this.page[keyComponents]
          .map((c, i) => ({ ...c, order: i }))

        // this.page.components
      }
    },
    checkMove (e) {
      // console.log(e.draggedContext)
      e.draggedContext.element.order = e.draggedContext.futureIndex
      // console.log('Future index: ' + e.draggedContext.futureIndex)
    },
    async openTemplateEditor () {
      this.showPageTemplate = true
      if (this.editor) {
        this.editor.model.dispose()
        this.editor.dispose()
      }

      setTimeout(() => {
        this.editor = this.$monaco.editor.create(this.$refs.editor, {
          value: this.page.template,
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
          this.templateHasChanges = this.editor.model.getValue() !== this.page.template
          // console.log('content has Change', this.codeHasChanges, this['monacoEditor-' + code.prop].model.getValue(), this.codes[i].value)
        })
      }, 300)
    },
    async getPage (name) {
      // this.page = {
      //   name: '',
      //   id: -1,
      //   path: '',
      //   components: [],
      //   origComponents: ''
      // }
      this.loading = true
      const filters = {}
      if (name) {
        filters.$or = [
          {
            name: { $containsi: name }
          },
          {
            path: { $containsi: name }
          },
          {
            components: { $containsi: name }
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
      const result = (await this.$likhaAPI.get('/pages?' + query)).data.data[0]
      const page = { id: result.id, ...result.attributes }

      const layoutParts = [
        'header',
        'left',
        '',
        'right',
        'footer'
      ]
      layoutParts.forEach(part => {
        let partComponents = 'components'
        if (part) partComponents = part + 'Components'
        // this.page[partComponents] = pageAreas[partComponents] || []
        page[partComponents] = (new Function('return ' + page[partComponents]))().sort((a, b) => a.order - b.order)
      })

      this.page = page

      // const pageAreas = { ...this.page, ...page }

      // console.log('pageAreas', pageAreas)
      // this.pageComponents = (new Function('return ' + page.components))().sort((a, b) => a.order - b.order)

      let orig = JSON.stringify(this.page.headerComponents)
      orig += JSON.stringify(this.page.leftComponents)
      orig += JSON.stringify(this.page.components)
      orig += JSON.stringify(this.page.rightComponents)
      orig += JSON.stringify(this.page.footerComponents)

      this.page.origComponents = orig
      // console.log('getPageComponents', this.page)
      this.debounce()
      this.loading = false
    },
    async getComponents (name) {
      // console.log('getting components', name)
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
        this.components = (await this.$likhaAPI.get('/components?' + query)).data.data.map(c => ({ ...c.attributes, props: {} }))
        // console.log('this.components', this.components)
      }, 1250)
      this.debounce()
      this.loading = false
    },
    async ctrlSave (e) {
      if (!(e.keyCode === 83 && e.ctrlKey)) {
        return false
      }

      e.preventDefault()
      if (this.codeHasChanges && this.templateHasChanges) this.save()
    },
    async save () {
      const headerComponents = this.$JSON5.stringify(this.page.headerComponents, {
        space: 2
      })
      const leftComponents = this.$JSON5.stringify(this.page.leftComponents, {
        space: 2
      })
      const components = this.$JSON5.stringify(this.page.components, {
        space: 2
      })
      const rightComponents = this.$JSON5.stringify(this.page.rightComponents, {
        space: 2
      })
      const footerComponents = this.$JSON5.stringify(this.page.footerComponents, {
        space: 2
      })
      await this.$likhaAPI.put('/pages/' + this.page.id, {
        data: {
          template: this.editor?.model.getValue() || this.page.template,
          headerComponents,
          leftComponents,
          components,
          rightComponents,
          footerComponents
        }
      })

      // console.log('savedPage', savedPage)

      // this.page.components = (new Function('return ' + components))().sort((a, b) => a.order - b.order)

      let orig = JSON.stringify(this.page.headerComponents)
      orig += JSON.stringify(this.page.leftComponents)
      orig += JSON.stringify(this.page.components)
      orig += JSON.stringify(this.page.rightComponents)
      orig += JSON.stringify(this.page.footerComponents)

      this.page.origComponents = orig

      this.page.template = this.editor?.model.getValue() || this.page.template

      // this.showPageTemplate = false
      this.templateHasChanges = false

      this.$q.notify({
        position: 'top-right',
        color: 'positive',
        icon: 'verified',
        message: 'Page Layout Saved!'
      })
    }
  },
  data () {
    return {
      showPageTemplate: false,
      templateHasChanges: false,
      code: `
        // console.log('html', this);
        const html = this.document.querySelector('html');
        // console.log('html', this);
        html.style.overflow = 'hidden';
      `,
      loading: true,
      page: {
        name: '',
        id: -1,
        path: '',
        components: [],
        leftComponents: [],
        rightComponents: [],
        headerComponents: [],
        footerComponents: [],
        origComponents: ''
      },
      pageComponents: [],
      pages: [],
      dragging: false,
      searchText: '',
      env: '/dev-env',
      components: []
    }
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
  }
}
</script>

<style>
.ghost {
  opacity: 0.5 !important;
  background: #c8ebfb !important;
}

.min-size {
  min-height: 100px !important;
  min-width: 100px !important;
}

.max-height-100 {
  max-height: 100px !important;
  overflow: hidden !important;
}
</style>
