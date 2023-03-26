import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue')
    },
    {
      path: '/MachineRoom',
      name: 'MachineRoom',
      component: () => import('../views/MachineRoom.vue')
    }
  ]
})

export default router
