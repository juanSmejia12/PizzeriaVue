<template>
  <div class="container">
    <h2>Registrar Nuevo Usuario</h2>
    <form @submit.prevent="saveUser">
      <div class="mb-3">
        <label>Nombre</label>
        <input type="text" class="form-control" v-model="user.name" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" class="form-control" v-model="user.email" required />
      </div>
      <div class="mb-3">
        <label>Contraseña</label>
        <input type="password" class="form-control" v-model="user.password" required />
      </div>
      <div class="mb-3">
        <label>Rol</label>
        <select class="form-control" v-model="user.role" required>
          <option disabled value="">Seleccione un rol</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
        </select>
      </div>

      <button class="btn btn-success" type="submit">Guardar</button>
      <router-link to="/users" class="btn btn-secondary mx-2">Cancelar</router-link>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'UsersNew',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        role: ''
      }
    }
  },
  methods: {
    saveUser() {
      axios.post('http://127.0.0.1:8000/api/users', this.user)
        .then(response => {
          Swal.fire('Usuario creado con éxito', '', 'success')
          this.$router.push({ name: 'Users' })
        })
.catch((error) => {
  console.error('Error al crear usuario:', error.response?.data || error.message)

  if (error.response?.status === 422) {
    const errors = error.response.data.errors
    const errorMessages = Object.values(errors).flat().join('\n')
    Swal.fire('Error de validación', errorMessages, 'error')
  } else {
    Swal.fire('Error', 'No se pudo crear el usuario.', 'error')
  }
})
    }
  }
}
</script>
