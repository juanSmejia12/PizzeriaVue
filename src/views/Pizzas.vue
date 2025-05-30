<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Pizzas
      <button @click="newPizza" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pizza, index) in pizzas" :key="pizza.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ pizza.name }}</td>
          <td>{{ pizza.description }}</td>
          <td>{{ pizza.price }}</td>
          <td>
            <button @click="editPizza(pizza.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePizza(pizza.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="pizzas.length === 0">
          <td colspan="5" class="text-center">No hay pizzas registradas.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Pizzas',
  data() {
    return {
      pizzas: []
    }
  },
  methods: {
    newPizza() {
      this.$router.push({ name: 'PizzasNew' }) 
    },
    editPizza(id) {
      this.$router.push({ name: 'PizzasEdit', params: { id } })
    },
    deletePizza(id) {
      Swal.fire({
        title: `¿Desea eliminar la pizza con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizzas/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.pizzas = response.data.pizzas 
              } else {
                Swal.fire('Error', 'No se pudo eliminar la pizza.', 'error')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar la pizza.', 'error')
            })
        }
      })
    }
  },
  mounted() {
  axios.get('http://127.0.0.1:8000/api/pizzas')
    .then(response => {
      console.log('Datos pizzas:', response.data)

      if (Array.isArray(response.data)) {
        this.pizzas = response.data
      } else if (Array.isArray(response.data.pizzas)) {
        this.pizzas = response.data.pizzas
      } else {
        this.pizzas = []
      }
    })
    .catch(() => {
      Swal.fire('Error', 'No se pudo cargar la lista de pizzas.', 'error')
    })
  }
}
</script>
