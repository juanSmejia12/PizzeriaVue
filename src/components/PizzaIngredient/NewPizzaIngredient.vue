<template>
  <div class="container">
    <h1>Nueva Relación Pizza - Ingrediente</h1>

    <div class="mb-3">
      <label>Pizza</label>
      <select v-model="pizza_id" class="form-control">
        <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
          {{ pizza.name }}
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label>Ingrediente</label>
      <select v-model="ingredient_id" class="form-control">
        <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
          {{ ingredient.name }}
        </option>
      </select>
    </div>

    <button @click="guardarRelacion" class="btn btn-success">Guardar</button>
    <button @click="$router.push({ name: 'pizzaIngredients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewPizzaIngredient',
  data() {
    return {
      pizzas: [],
      ingredients: [],
      pizza_id: '',
      ingredient_id: ''
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizzas').then(res => this.pizzas = res.data)
    axios.get('http://127.0.0.1:8000/api/ingredients').then(res => this.ingredients = res.data)
  },
  methods: {
    guardarRelacion() {
      axios.post('http://127.0.0.1:8000/api/pizza-ingredients', {
        pizza_id: this.pizza_id,
        ingredient_id: this.ingredient_id
      })
      .then(() => {
        Swal.fire('¡Guardado!', 'Relación creada correctamente.', 'success')
        this.$router.push({ name: 'pizzaIngredients' })
      })
      .catch(error => {
        if (error.response.status === 409) {
          Swal.fire('Duplicado', 'Esta relación ya existe.', 'warning')
        } else {
          Swal.fire('Error', 'No se pudo crear la relación.', 'error')
        }
      })
    }
  }
}
</script>
