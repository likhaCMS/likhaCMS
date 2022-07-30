
const routes = [
  {
    path: '/component-editor/:name',
    component: () => import('components/componentEditor.vue')
    // component: () => import('layouts/MainLayout.vue'),
    // children: [
    //   { path: '', component: () => import('pages/IndexPage.vue') }
    // ]
  },
  {
    path: '/component-editor',
    component: () => import('components/componentEditor.vue')
  },
  {
    path: '/page-editor/:name',
    component: () => import('components/pageEditor.vue')
  },
  {
    path: '/page-editor',
    component: () => import('components/pageEditor.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
