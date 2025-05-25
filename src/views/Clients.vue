<template>
  <div class="container mt-5">
    <h2 class="mb-4">Lista de Clientes</h2>
    <router-link to="/crear-cliente" class="btn btn-primary mb-3">Crear Cliente</router-link>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.id }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>
            <button class="btn btn-danger me-2" @click="eliminarCliente(cliente.id)">Eliminar</button>
            <router-link :to="`/editar-cliente/${cliente.id}`" class="btn btn-warning">Editar</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Clientes',
  data() {
    return {
      clientes: []
    }
  },
  methods: {
    async cargarClientes() {
      try {
        const response = await axios.get('http://localhost:8000/api/clients')
        this.clientes = response.data
      } catch (error) {
        console.error('Error al cargar los clientes:', error)
      }
    },
    async eliminarCliente(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
        try {
          await axios.delete(`http://localhost:8000/api/clients/${id}`)
          this.cargarClientes() // Recargar la lista después de eliminar
        } catch (error) {
          console.error('Error al eliminar cliente:', error)
        }
      }
    }
  },
  mounted() {
    this.cargarClientes()
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
