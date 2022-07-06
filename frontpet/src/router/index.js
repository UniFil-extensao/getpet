import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/Users/ProfileView.vue'
import SignupView from '../views/Users/SignupView.vue'
import LoginView from '../views/Users/LoginView.vue'
import IndexView from '../views/Pets/IndexView.vue'
import ProfilePetView from '../views/Pets/ProfilePetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users/:id',
      name: 'Users',
      component: ProfileView
    },

    {
      path: '/signup',
      name: 'Signup',
      component: SignupView
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },

    {
      path: '/',
      name: 'Index',
      component: IndexView
    },

    {
      path: '/adoptions/:id',
      name: 'Adoptions',
      component: ProfilePetView
    }

  ]
})

export default router
