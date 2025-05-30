<template>
  <div class="container">
    <h1 class="text-start">Editar Ingrediente</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre del ingrediente</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>

    <button @click="updateIngredient" class="btn btn-warning">Actualizar</button>
    <button @click="$router.push({ name: 'Ingredients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditIngredient',
  data() {
    return {
      id: null,
      name: ''
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/ingredients/${this.id}`)
      .then(response => {
        this.name = response.data.name
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar el ingrediente.', 'error')
      })
  },
  methods: {
    updateIngredient() {
      axios.put(`http://127.0.0.1:8000/api/ingredients/${this.id}`, {
        name: this.name
      })
        .then(() => {
          Swal.fire('¡Actualizado!', 'Ingrediente actualizado correctamente.', 'success')
          this.$router.push({ name: 'Ingredients' })
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo actualizar el ingrediente.', 'error')
        })
    }
  }
}
</script>
