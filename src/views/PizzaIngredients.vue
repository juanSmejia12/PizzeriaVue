<template>
  <div class="container">
    <h1 class="text-start">
      Relación Pizza - Ingrediente
      <button @click="newPizzaIngredient" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Pizza</th>
          <th>Ingrediente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in pizzaIngredients" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.pizza?.name || 'No disponible' }}</td>
          <td>{{ item.ingredient?.name || 'No disponible' }}</td>
          <td>
            <button @click="editPizzaIngredient(item.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePizzaIngredient(item.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="pizzaIngredients.length === 0">
          <td colspan="4" class="text-center">No hay relaciones registradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PizzaIngredients',
  data() {
    return {
      pizzaIngredients: []
    }
  },
  methods: {
    newPizzaIngredient() {
      this.$router.push({ name: 'PizzaIngredientNew' })
    },
    editPizzaIngredient(id) {
      this.$router.push({ name: 'PizzaIngredientEdit', params: { id } })
    },
    deletePizzaIngredient(id) {
      Swal.fire({
        title: `¿Desea eliminar la relación con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-ingredients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzaIngredients = response.data.pizza_ingredients
              } else {
                Swal.fire('Error', 'No se pudo eliminar.', 'error')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/pizza-ingredients')
      .then(response => {
        console.log('Relaciones cargadas:', response.data)

        if (Array.isArray(response.data)) {
          this.pizzaIngredients = response.data
        } else if (Array.isArray(response.data.pizza_ingredients)) {
          this.pizzaIngredients = response.data.pizza_ingredients
        } else {
          this.pizzaIngredients = []
        }
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista.', 'error')
      })
  }
}
</script>
