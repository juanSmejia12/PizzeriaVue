<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Usuarios
      <button @click="newUser" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <button @click="editUser(user.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteUser(user.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="5" class="text-center">No hay usuarios registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Users',
  data() {
    return {
      users: []
    }
  },
  methods: {
    newUser() {
      this.$router.push({ name: 'UsersNew' }) 
    },
    editUser(id) {
      this.$router.push({ name: 'UsersEdit', params: { id } })
    },
    deleteUser(id) {
      Swal.fire({
        title: `¿Desea eliminar el usuario con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
            .then(response => {
              Swal.fire('¡Eliminado!', '', 'success')
              this.loadUsers()
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error')
            })
        }
      })
    },
    loadUsers() {
      axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          this.users = Array.isArray(response.data) ? response.data : []
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo cargar la lista de usuarios.', 'error')
        })
    }
  },
  mounted() {
    this.loadUsers()
  }
}
</script>
