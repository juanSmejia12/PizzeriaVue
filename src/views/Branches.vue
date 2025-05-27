<template>
  <div class="container">
    <h1 class="text-start">Listado de Sucursales
      <button @click="newBranch()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(branch, index) in branches" :key="branch.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ branch.name }}</td>
          <td>{{ branch.address }}</td>
          <td>
            <button @click="editBranch(branch.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteBranch(branch.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
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
  name: 'Branches',
  data() {
    return {
      branches: []
    }
  },
  methods: {
    newBranch() {
      this.$router.push({ name: 'NewBranch' })
    },
    editBranch(id) {
      this.$router.push({ name: 'EditBranch', params: { id } })
    },
    deleteBranch(id) {
      Swal.fire({
        title: `¿Desea eliminar la sucursal con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/branches/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.branches = response.data.branches
              }
            })
            .catch(error => {
              Swal.fire('Error', 'No se pudo eliminar la sucursal.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/branches')
      .then(response => {
        this.branches = response.data.branches
      })
      .catch(error => {
        Swal.fire('Error', 'No se pudo cargar la lista de sucursales.', 'error')
      })
  }
}
</script>