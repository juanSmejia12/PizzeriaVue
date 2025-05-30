<template>
  <div class="container">
    <h1 class="text-start">Nuevo Ingrediente</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre del ingrediente</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>


    <button @click="createIngredient" class="btn btn-success">Guardar</button>
    <button @click="$router.push({ name: 'Ingredients' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewIngredient',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    createIngredient() {
        axios.post('http://127.0.0.1:8000/api/ingredients', {
         name: this.name,
          })
    .then(() => {
      Swal.fire('¡Guardado!', 'Ingrediente creado correctamente.', 'success')
      this.$router.push({ name: 'Ingredients' })
    })
    .catch(error => {
      console.error('Error al crear ingrediente:', error.response)
      Swal.fire('Error', error.response?.data?.message || 'No se pudo crear el ingrediente.', 'error')
    })
    }
  }
}
</script>
