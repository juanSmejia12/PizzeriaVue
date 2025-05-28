import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Clients from '../views/Clients.vue'
import Purchases from '../views/Purchases.vue'
import Suppliers from '../views/Suppliers.vue'
import Employees from '../views/Employees.vue'
import Raw_materials from '../views/Raw_materials.vue'

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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
