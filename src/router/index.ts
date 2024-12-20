// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ShopLayout from '@/layouts/ShopLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ShopLayout,
    children:[
      {
        path:'',
        name:'tienda',
        component: () => import('@/views/Shop.vue')
      },
    ]
  },
        {
        path: '/login',
        component: LoginLayout,
        children:[
          {
            path:'',
            name:'login',
            component: () => import('@/views/Login.vue')
          }
        ]
      },
      {
        path: '/dashboard',
        component: DashboardLayout,
        children:[
          {
            path:'',
            name:'dashboard',
            component: () => import('@/views/Dashboard.vue')
          }
        ]
      }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
