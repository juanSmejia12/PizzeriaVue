import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Clients from '@/views/Clients.vue'
import Purchases from '../views/Purchases.vue'
import Suppliers from '../views/Suppliers.vue'
import Employees from '../views/Employees.vue'
import Raw_materials from '../views/Raw_materials.vue'
import Order_extra_ingredients from '@/views/Order_extra_ingredients.vue'
import Pizza_raw_materials from '@/views/Pizza_raw_materials.vue'
import Branches from '@/views/Branches.vue'
import Pizzas from '@/views/Pizzas.vue'
import NewPizza from '@/components/Pizza/NewPizza.vue'
import EditPizza from '@/components/Pizza/EditPizza.vue'
import App from '@/views/App.vue'
import Ingredients from '@/views/Ingredients.vue'
import NewIngredient from '@/components/Ingredient/NewIngredient.vue'
import EditIngredient from '@/components/Ingredient/EditIngredient.vue'
import PizzaIngredients from '@/views/PizzaIngredients.vue'
import NewPizzaIngredient from '@/components/PizzaIngredient/NewPizzaIngredient.vue'
import EditPizzaIngredient from '@/components/PizzaIngredient/EditPizzaIngredient.vue'
import ExtraIngredients from '@/views/ExtraIngredients.vue'
import ExtraIngredientNew from '@/components/ExtraIngredient/ExtraIngredientNew.vue'
import ExtraIngredientEdit from '@/components/ExtraIngredient/ExtraIngredientEdit.vue'

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
    path: '/order_extra_ingredients',
    name: 'order_extra_ingredients',
    component: Order_extra_ingredients
  },
  {
    path: '/pizzas',
    name: 'pizzas',
    component: Pizzas
  },
  {
  path: '/pizzas/new',
  name: 'PizzasNew',
  component: NewPizza
},
{
  path: '/pizzas/edit/:id',
  name: 'PizzasEdit',
  component: EditPizza,
  props: true
},
{
  path: '/ingredients',
  name: 'Ingredients',
  component: Ingredients
},
{
  path: '/ingredients/new',
  name: 'IngredientsNew',
  component: NewIngredient
},
{
    path: '/ingredients/:id/edit',
    name: 'IngredientsEdit',
    component: EditIngredient,
    props: true
},
{
  path: '/pizza-ingredients',
  name: 'pizzaIngredients',
  component: PizzaIngredients
},
{
  path: '/pizza-ingredients/new',
  name: 'PizzaIngredientNew',
  component: NewPizzaIngredient
},
{
  path: '/pizza-ingredients/:id/edit',
  name: 'PizzaIngredientEdit',
  component: EditPizzaIngredient,
  props: true
},
  {
    path: '/extra-ingredients',
    name: 'ExtraIngredients',
    component: ExtraIngredients
  },
    {
    path: '/extra-ingredients/new',
    name: 'ExtraIngredientNew',
    component: ExtraIngredientNew
  },
  {
    path: '/extra-ingredients/:id/edit',
    name: 'ExtraIngredientEdit',
    component: ExtraIngredientEdit,
    props: true
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
