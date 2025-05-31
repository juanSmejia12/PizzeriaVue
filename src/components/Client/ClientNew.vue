<template>
  <div class="container mt-5">
    <h2>Crear Cliente</h2>

    <div class="mb-3">
      <label for="user_id" class="form-label">Usuario</label>
      <select v-model="user_id" class="form-select" id="user_id">
        <option value="" disabled>Seleccione un usuario</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }} ({{ user.email }})
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">Dirección</label>
      <input v-model="address" type="text" class="form-control" id="address" />
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Teléfono</label>
      <input v-model="phone" type="text" class="form-control" id="phone" />
    </div>

    <button @click="crearCliente" class="btn btn-success">Guardar</button>
    <button @click="$router.push({ name: 'clients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ClientNew',
  data() {
    return {
      user_id: '',
      address: '',
      phone: '',
      users: []
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    loadUsers() {
      axios.get('http://localhost:8000/api/users') 
        .then(response => {
          this.users = response.data
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo cargar la lista de usuarios.', 'error')
        })
    },
    crearCliente() {
      if (!this.user_id || !this.address || !this.phone) {
        Swal.fire('Campos incompletos', 'Todos los campos son obligatorios.', 'warning')
        return
      }

      axios.post('http://localhost:8000/api/clients', {
        user_id: this.user_id,
        address: this.address,
        phone: this.phone
      })
        .then(() => {
          Swal.fire('¡Guardado!', 'Cliente creado correctamente.', 'success')
          this.$router.push({ name: 'clients' })
        })
        .catch(error => {
            console.error(error)
            const errors = error.response?.data?.errors || {}
            let message = error.response?.data?.message || 'Error desconocido'

            for (const key in errors) {
                message += `\n${key}: ${errors[key].join(', ')}`
            }

            Swal.fire('Error al crear cliente', message, 'error')
        })
    }
  }
}
</script>
