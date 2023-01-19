import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutPage from '../views/AboutView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreatePostView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: AboutPage
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue')
  },
  {
    path: '/myposts',
    name: 'myposts',
    component: () => import('../views/MyPostsView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/activity',
    name: 'activity',
    component: () => import('../views/ActivityView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
