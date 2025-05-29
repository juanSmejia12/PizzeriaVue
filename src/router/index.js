import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Clients from '@/views/Clients.vue'
import Purchases from '../views/Purchases.vue'
import Suppliers from '../views/Suppliers.vue'
import Employees from '../views/Employees.vue'
import Raw_materials from '../views/Raw_materials.vue'
import Order_extra_ingredients from '@/views/Order_extra_ingredients.vue'
import Pizza_raw_materials from '@/views/Pizza_raw_materials.vue'
import Raw_material from '@/views/Raw_material.vue'
import Branches from '@/views/Branches.vue'
import App from '@/views/App.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
  },
  {
    path: '/purchases',
    name: 'purchases',
    component: Purchases
  },
  {
    path: '/employees',
    name: 'employees',
    component: Employees
  },
  {
    path: '/raw_materials',
    name: 'raw_materials',
    component: Raw_materials
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: Suppliers
  },
  {
    path: '/app',
    name: 'app',
    component: App
  },
  {
    path: '/pizza_raw_materials',
    name: 'pizza_raw_materials',
    component: Pizza_raw_materials
  },
  {
    path: '/branches',
    name: 'branches',
    component: Branches
  },
  {
    path: '/raw_material',
    name: 'raw_material',
    component: Raw_material
  },
  {
    path: '/order_extra_ingredients',
    name: 'order_extra_ingredients',
    component: Order_extra_ingredients
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
