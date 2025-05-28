import { createRouter, createWebHashHistory } from 'vue-router'



import HomeView from '../views/HomeView.vue';
import Purchases from '../views/Purchases.vue';
import Clients from '@/views/Clients.vue';
import Order_extra_ingredients from '@/views/Order_extra_ingredients.vue';
import Pizza_raw_materials from '@/views/Pizza_raw_materials.vue';
import Raw_material from '@/views/Raw_material.vue';
import Branches from '@/views/Branches.vue';
import App from '@/views/App.vue';


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
