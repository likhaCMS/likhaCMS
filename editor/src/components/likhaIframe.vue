<template>
    <div class="column"
      :class="{
        'border shadow-24 z-top q-mx-md q-mb-md': showToolbar, // ? '2px solid #1976d2 !important' : '',
        'full-width': !showToolbar
      }"
      @mouseover="showToolbar = true"
      @mouseleave="showToolbar = false"
    >
      <q-bar v-show="component.name && (showToolbar || dragging)" dark
        class="handle bg-dark text-white shadow-10 full-width"
      >
        <!-- <q-icon name="laptop_chromebook" /> -->
        <q-btn dense flat icon="settings" />
        <div>
          {{ component.name }} {{component.order}}
        </div>

        <q-space />
        <q-btn dense flat icon="settings" @click="openPropsSettings" />
        <q-btn dense flat icon="delete" @click="$emit('remove', component.name, component.order), showToolbar = false" />
      </q-bar>
      <iframe ref="iframeDev" :height="height" style="border:none;"
        v-if="env === '/dev-env'"
        scrolling="no"
        class="shadow-transition"
        :src="src" frameborder="0"></iframe>
      <iframe ref="iframeStaging" :height="height" style="border:none;"
        v-else-if="env === '/staging-env'"
        scrolling="no"
        class="shadow-transition"
        :src="src" frameborder="0"></iframe>
      <iframe ref="iframe" :height="height" style="border:none;"
        v-else
        scrolling="no"
        class="shadow-transition"
        :src="src" frameborder="0"></iframe>
      <!-- <div v-show="showToolbar" class="absolute">header</div> -->
    </div>
</template>

<script>

export default {
  props: ['component', 'dragging', 'env'],
  emits: ['remove', 'update:model-value'],
  watch: {
    async env (newEnv, oldEnv) {
      await this.$nextTick()
      this.height = 0
      await this.$nextTick()
    }
  },
  unmounted () {
    window.removeEventListener('message', this.listener)
  },
  async beforeMount () {
    this.listener = async (event) => {
      if (event.data.height && event.data.name === this.component.name) {
        // console.log('message', event.data)
        // console.log('this.$refs', this.$refs)

        switch (event.data.env) {
          case 'dev':
            this.$refs.iframeDev.style.height = event.data.height + 'px'
            this.$refs.iframeDev.height = event.data.height
            break
          case 'staging':
            this.$refs.iframeStaging.style.height = event.data.height + 'px'
            this.$refs.iframeStaging.height = event.data.height
            break
          default:
            this.$refs.iframe.style.height = event.data.height + 'px'
            this.$refs.iframe.height = event.data.height
            break
        }
        this.height = event.data.height
        // console.log('height changed', this.$refs.iframe.height)
      }
    }
    window.addEventListener('message', this.listener)
  },
  methods: {
    async openPropsSettings () {
      const component = this.component
      // console.log(import('components/propEditor.vue'))
      this.$q.dialog({
        component: (await import('components/propEditor.vue')).default,

        // props forwarded to your custom component
        componentProps: {
          component,
          env: this.env
          // ...more..props...
        }
      }).onOk((data) => {
        // console.log('OK', data, component)
        this.$emit('update:model-value', { ...component, ...data })
      })
    }
  },
  computed: {
    src () {
      let env = ''
      if (this.env === '/dev-env') env = 'Dev'
      if (this.env === '/staging-env') env = 'Staging'
      const query = this.$qs.stringify({
        lkProps: this.component['props' + env]
      })
      return this.$previewHost + this.env + '/lk-preview/' + this.component.name + '?' + query
    }
  },
  data () {
    return {
      showToolbar: false,
      height: 0
    }
  }
}
</script>

<style>
iframe {
  margin: 0;
  padding: 0;
  border: 0;
}

.handle {
  cursor: move; /* fallback if grab cursor is unsupported */
  /* cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab; */
}

/* .handle:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
} */

.border {
  border: 1px solid rgba(255, 0, 0, .5);
    -webkit-background-clip: padding-box; /* for Safari */
    background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */

  width: 98%
}

.max-height-100 {
  max-height: 100px !important;
  overflow: hidden !important;
}
</style>
