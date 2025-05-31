<template>
  <div class="container">
    <h2>Editar Usuario</h2>
    <form @submit.prevent="updateUser">
      <div class="mb-3">
        <label>Nombre</label>
        <input type="text" class="form-control" v-model="user.name" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" v-model="user.email" required />
      </div>
      <div class="mb-3">
        <label>Rol</label>
        <select class="form-control" v-model="user.role" required>
          <option disabled value="">Seleccione un rol</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>

      <button class="btn btn-primary" type="submit">Actualizar</button>
      <router-link to="/users" class="btn btn-secondary mx-2">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'UsersEdit',
  data() {
    return {
      user: {
        name: '',
        email: '',
        role: ''
      }
    }
  },
  methods: {
    loadUser() {
      axios.get(`http://127.0.0.1:8000/api/users/${this.$route.params.id}`)
        .then(response => {
          this.user = response.data
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo cargar el usuario.', 'error')
        })
    },
    updateUser() {
      axios.put(`http://127.0.0.1:8000/api/users/${this.$route.params.id}`, this.user)
        .then(response => {
          Swal.fire('Usuario actualizado con éxito', '', 'success')
          this.$router.push({ name: 'Users' })
        })
        .catch(() => {
          console.error('Error al crear usuario:', error.response?.data || error.message)
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error')
        })
    }
  },
  mounted() {
    this.loadUser()
  }
}
</script>
