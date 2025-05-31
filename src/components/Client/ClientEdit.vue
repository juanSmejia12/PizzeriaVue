<template>
  <div class="container mt-5">
    <h2>Editar Cliente</h2>

    <div class="mb-3">
      <label for="address" class="form-label">Dirección</label>
      <input v-model="address" type="text" class="form-control" id="address" />
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Teléfono</label>
      <input v-model="phone" type="text" class="form-control" id="phone" />
    </div>

    <button @click="actualizarCliente" class="btn btn-warning">Actualizar</button>
    <button @click="$router.push({ name: 'clients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ClientEdit',
  data() {
    return {
      id: null,
      address: '',
      phone: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get(`http://localhost:8000/api/clients/${this.id}`)
      .then(response => {
        this.address = response.data.address
        this.phone = response.data.phone
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar el cliente.', 'error')
      })
  },
  methods: {
    actualizarCliente() {
      axios.put(`http://localhost:8000/api/clients/${this.id}`, {
        address: this.address,
        phone: this.phone
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
