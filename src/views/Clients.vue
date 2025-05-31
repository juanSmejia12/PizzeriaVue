<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Clientes
      <button @click="newClient" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="client.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ client.user?.name }}</td>
          <td>{{ client.user?.email }}</td>
          <td>
            <button @click="editClient(client.id)" class="btn btn-warning mx-1">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteClient(client.id)" class="btn btn-danger mx-1">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="clients.length === 0">
          <td colspan="4" class="text-center">No hay clientes registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Clients',
  data() {
    return {
      clients: []
    }
  },
  methods: {
    newClient() {
      this.$router.push({ name: 'ClientNew' })
    },
    editClient(id) {
      this.$router.push({ name: 'ClientEdit', params: { id } })
    },
    deleteClient(id) {
      Swal.fire({
        title: `¿Desea eliminar el cliente con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/clients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.clients = this.clients.filter(c => c.id !== id)
              } else {
                Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/clients')
      .then(response => {
        console.log('Datos clientes:', response.data)

        if (Array.isArray(response.data)) {
          this.clients = response.data
        } else if (Array.isArray(response.data.clients)) {
          this.clients = response.data.clients
        } else {
          this.clients = []
        }
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de clientes.', 'error')
      })
  }
}
</script>
