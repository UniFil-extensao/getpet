import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/Users/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users/:id',
      name: 'Users',
      component: ProfileView
    }
  ]
})

export default router
