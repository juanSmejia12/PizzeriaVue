<template>
  <div class="container">
    <h1 class="text-start">Nuevo Cliente</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre del Cliente</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input v-model="email" type="email" class="form-control" id="email" />
    </div>

    <button @click="createClient" class="btn btn-success">Guardar</button>
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
      name: '',
      email: ''
    }
  },
  methods: {
    createClient() {
      axios.post('http://127.0.0.1:8000/api/clients', {
        name: this.name,
        email: this.email
      })
        .then(() => {
          Swal.fire('¡Guardado!', 'Cliente creado correctamente.', 'success')
          this.$router.push({ name: 'clients' })
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo crear el cliente.', 'error')
        })
    }
  }
}
</script>
