<template>
  <div class="container">
    <h1 class="text-start">Listado de Materias Primas
      <button @click="newMaterial()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Unidad</th>
          <th>Stock Actual</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(material, index) in rawMaterials" :key="material.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ material.name }}</td>
          <td>{{ material.unit }}</td>
          <td>{{ material.current_stock }}</td>
          <td>
            <button @click="editMaterial(material.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteMaterial(material.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RawMaterials',
  data() {
    return {
      rawMaterials: []
    }
  },
  methods: {
    newMaterial() {
      this.$router.push({ name: 'NewRawMaterial' })
    },
    editMaterial(id) {
      this.$router.push({ name: 'EditRawMaterial', params: { id } })
    },
    deleteMaterial(id) {
      Swal.fire({
        title: `¿Desea eliminar la materia prima con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/raw-materials/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.rawMaterials = response.data.raw_materials
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar.', 'error')
            })
        }
      })
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/raw-materials')
      .then(response => {
        this.rawMaterials = response.data.raw_materials
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista.', 'error')
      })
  }
}
</script>