<template>
  <div class="container">
    <h1 class="text-start">Nueva Pizza</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre de la pizza</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>

    <button @click="createPizza" class="btn btn-success">Guardar</button>
    <button @click="$router.push({ name: 'pizzas' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewPizza',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    createPizza() {
      console.log('Nombre ingresado:', this.name)
      axios.post('http://127.0.0.1:8000/api/pizzas', { name: this.name })
        .then(() => {
          Swal.fire('¡Guardado!', 'Pizza creada correctamente.', 'success')
          this.$router.push({ name: 'pizzas' })
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo crear la pizza.', 'error')
        })
    }
  }
}
</script>
