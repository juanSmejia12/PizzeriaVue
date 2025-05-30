<template>
  <div class="container">
    <h1>Relación Pizza - Ingrediente</h1>
    <router-link class="btn btn-success mb-3" :to="{ name: 'PizzaIngredientNew' }">Nueva relación</router-link>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Pizza</th>
          <th>Ingrediente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="relacion in relaciones" :key="relacion.id">
          <td>{{ relacion.id }}</td>
<td>{{ relacion.pizza ? relacion.pizza.name : 'Sin pizza' }}</td>
<td>{{ relacion.ingredient ? relacion.ingredient.name : 'Sin ingrediente' }}</td>

          <td>
            <button class="btn btn-warning btn-sm" @click="editar(relacion.id)">Editar</button>
            <button class="btn btn-danger btn-sm mx-1" @click="eliminar(relacion.id)">Eliminar</button>
          </td>
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
      relaciones: []
    }
  },
  mounted() {
    this.cargarRelaciones()
  },
  methods: {
    cargarRelaciones() {
      axios.get('http://127.0.0.1:8000/api/pizza-ingredients')
        .then(response => {
          this.relaciones = response.data
        })
    },
    editar(id) {
      this.$router.push({ name: 'PizzaIngredientEdit', params: { id } })
    },
    eliminar(id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta relación será eliminada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-ingredients/${id}`)
            .then(() => {
              Swal.fire('Eliminado', 'Relación eliminada correctamente', 'success')
              this.cargarRelaciones()
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar', 'error')
            })
        }
      })
    }
  }
}
</script>
