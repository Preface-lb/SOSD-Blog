//src/router/index.ts

import { homeRoute } from './routes'

import { loginRoute } from './routes'
import { registerRoute } from './routes'
import { aboutRoute } from './routes'

import { bloghomeRoute } from './routes'

import { friendsRoute } from './routes'

import { publishRoute } from './routes'

import { createRouter, createWebHashHistory, type Router } from 'vue-router'

export const routes = [
  {
    path: '/',
    children: homeRoute,
  },
  {
    path: '/login',
    children: loginRoute,
  },

  {
    path: '/register',
    children: registerRoute,
  },
  {
    path: '/about',
    children: aboutRoute,
  },
  {
    path: '/bloghome',
    children: bloghomeRoute,
  },
  {
    path: '/friends',
    children: friendsRoute,
  },
  {
    path: '/publish',
    children: publishRoute,
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('../components/Forbidden.vue'),
    meta: {
      permissionKey: null,
    },
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router    
