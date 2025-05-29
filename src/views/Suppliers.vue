<template>
  <div class="container mt-5">
    <h2 class="mb-4">Lista de Proveedores</h2>
    <router-link to="/crear-proveedor" class="btn btn-primary mb-3">Crear Proveedor</router-link>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="proveedor in proveedores" :key="proveedor.id">
          <td>{{ proveedor.id }}</td>
          <td>{{ proveedor.name }}</td>
          <td>{{ proveedor.contact_name }}</td>
          <td>{{ proveedor.address }}</td>
          <td>{{ proveedor.phone }}</td>
          <td>{{ proveedor.email }}</td>
          <td>
            <button class="btn btn-danger me-2" @click="eliminarProveedor(proveedor.id)">Eliminar</button>
            <router-link :to="`/editar-proveedor/${proveedor.id}`" class="btn btn-warning">Editar</router-link>
          </td>
        </tr>
        <tr v-if="proveedores.length === 0">
          <td colspan="7" class="text-center">No hay proveedores registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Suppliers',
  data() {
    return {
      proveedores: []
    }
  },
  methods: {
    async cargarProveedores() {
      try {
        const response = await axios.get('http://localhost:8000/api/suppliers')
        this.proveedores = response.data
      } catch (error) {
        console.error('Error al cargar los proveedores:', error)
      }
    },
    async eliminarProveedor(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        try {
          await axios.delete(`http://localhost:8000/api/suppliers/${id}`)
          this.cargarProveedores() // Recargar lista tras eliminación
        } catch (error) {
          console.error('Error al eliminar proveedor:', error)
        }
      }
    }
  },
  mounted() {
    this.cargarProveedores()
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
