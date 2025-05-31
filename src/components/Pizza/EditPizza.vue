<template>
  <div class="container">
    <h1 class="text-start">Editar Cliente</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre del Cliente</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Correo Electrónico</label>
      <input v-model="email" type="email" class="form-control" id="email" />
    </div>

    <button @click="updateClient" class="btn btn-success">Actualizar</button>
    <button @click="$router.push({ name: 'clients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ClientEdit',
  props: ['id'],
  data() {
    return {
      name: '',
      email: ''
    }
  },
  mounted() {
    this.loadClient()
  },
  methods: {
    loadClient() {
      axios.get(`http://127.0.0.1:8000/api/clients/${this.id}`)
        .then(response => {
          this.name = response.data.name
          this.email = response.data.email
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo cargar el cliente.', 'error')
        })
    },
    updateClient() {
      axios.put(`http://127.0.0.1:8000/api/clients/${this.id}`, {
        name: this.name,
        email: this.email
      })
        .then(() => {
          Swal.fire('¡Actualizado!', 'Cliente actualizado correctamente.', 'success')
          this.$router.push({ name: 'clients' })
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error')
        })
    }
  }
}
</script>
