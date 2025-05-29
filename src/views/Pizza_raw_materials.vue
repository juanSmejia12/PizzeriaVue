<template>
  <div class="container">
    <h1 class="text-start">Relación Pizza - Materia Prima
      <button @click="newRelation()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Pizza</th>
          <th>Materia Prima</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(relation, index) in relations" :key="relation.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ relation.pizza_name }}</td>
          <td>{{ relation.material_name }}</td>
          <td>{{ relation.quantity }}</td>
          <td>
            <button @click="editRelation(relation.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deleteRelation(relation.id)" class="btn btn-danger mx-2">
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
  name: 'PizzaRawMaterialIndex',
  data() {
    return {
      relations: []
    }
  },
  methods: {
    newRelation() {
      this.$router.push({ name: 'NewPizzaRawMaterial' })
    },
    editRelation(id) {
      this.$router.push({ name: 'EditPizzaRawMaterial', params: { id } })
    },
    deleteRelation(id) {
      Swal.fire({
        title: `¿Desea eliminar la relación con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/pizza-raw-materials/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.relations = response.data.items
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
    axios.get('http://127.0.0.1:8000/api/pizza-raw-materials')
      .then(response => {
        this.relations = response.data.items
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista.', 'error')
      })
  }
}
</script>