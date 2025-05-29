<template>
  <div class="container mt-5">
    <h2 class="mb-4">Lista de Empleados</h2>
    <router-link to="/crear-empleado" class="btn btn-primary mb-3">Crear Empleado</router-link>

    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Posición</th>
          <th>Identificación</th>
          <th>Salario</th>
          <th>Fecha Contratación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="empleado in empleados.filter(e => e && e.id)" :key="empleado.id">
          <td>{{ empleado.id }}</td>
          <td>{{ empleado.user_id }}</td>
          <td>{{ empleado.position }}</td>
          <td>{{ empleado.identification_number }}</td>
          <td>{{ formatCurrency(empleado.salary) }}</td>
          <td>{{ empleado.hire_date }}</td>
          <td>
            <button class="btn btn-danger me-2" @click="eliminarEmpleado(empleado.id)">Eliminar</button>
            <router-link :to="`/editar-empleado/${empleado.id}`" class="btn btn-warning">Editar</router-link>
          </td>
        </tr>
        <tr v-if="empleados.length === 0">
          <td colspan="7" class="text-center">No hay empleados registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      empleados: [], // ✅ asegurarse de que empieza como array
    };
  },
  mounted() {
    this.cargarEmpleados();
  },
  methods: {
    async cargarEmpleados() {
      try {
        const response = await axios.get('http://localhost:8000/api/employees');
        console.log('Empleados cargados:', response.data);
        this.empleados = response.data; // ✅ debe ser un array
      } catch (error) {
        console.error('Error al cargar empleados', error);
      }
    }
  }
}
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
