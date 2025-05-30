<template>
  <div class="container">
    <h1 class="text-start">
      Ingredientes Extra
      <button @click="newExtra" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(extra, index) in extras" :key="extra.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ extra.name }}</td>
          <td>${{ Number(extra.price).toFixed(2) }}</td>
          <td>
            {{
                isNaN(Number(extra.price))
                ? 'Precio inválido'
                : '$' + Number(extra.price).toFixed(2)
            }}
          </td>
          <td>
            <button @click="editExtra(extra.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteExtra(extra.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="extras.length === 0">
          <td colspan="4" class="text-center">No hay ingredientes extra registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ExtraIngredients',
  data() {
    return {
      extras: []
    }
  },
  methods: {
    newExtra() {
      this.$router.push({ name: 'ExtraIngredientNew' })
    },
    editExtra(id) {
      this.$router.push({ name: 'ExtraIngredientEdit', params: { id } })
    },
    deleteExtra(id) {
      Swal.fire({
        title: `¿Eliminar ingrediente extra con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/extra-ingredients/${id}`)
            .then(() => {
              Swal.fire('¡Eliminado!', '', 'success')
              this.loadExtras()
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el ingrediente extra.', 'error')
            })
        }
      })
    },
    loadExtras() {
      axios.get('http://127.0.0.1:8000/api/extra-ingredients')
    .then(response => {
      console.log('Extras cargados:', response.data) 
      this.extras = response.data.map(extra => ({
        ...extra,
        price: Number(extra.price)
      }))
    })
    .catch(() => {
      Swal.fire('Error', 'No se pudo cargar la lista.', 'error')
    })
    }
  },
  mounted() {
    this.loadExtras()
  }
}
</script>
