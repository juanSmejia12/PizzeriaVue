<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Ingredientes
      <button @click="newIngredient" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ingredient, index) in ingredients" :key="ingredient.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ ingredient.name }}</td>
          <td>
            <button @click="editIngredient(ingredient.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteIngredient(ingredient.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="ingredients.length === 0">
          <td colspan="4" class="text-center">No hay ingredientes registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Ingredients',
  data() {
    return {
      ingredients: []
    }
  },
  methods: {
    newIngredient() {
      this.$router.push({ name: 'IngredientsNew' })
    },
    editIngredient(id) {
      this.$router.push({ name: 'IngredientsEdit', params: { id } })
    },
    deleteIngredient(id) {
      Swal.fire({
        title: `¿Desea eliminar el ingrediente con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
            .then(() => {
              Swal.fire('¡Eliminado!', '', 'success')
              this.ingredients = this.ingredients.filter(i => i.id !== id)
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el ingrediente.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/ingredients')
      .then(response => {
        console.log('Datos ingredientes:', response.data)
        this.ingredients = Array.isArray(response.data) ? response.data : []
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de ingredientes.', 'error')
      })
  }
}
</script>
