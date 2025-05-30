<template>
  <div class="container">
    <h1 class="text-start">Editar Pizza</h1>

    <div class="mb-3">
      <label for="name" class="form-label">Nombre de la pizza</label>
      <input v-model="name" type="text" class="form-control" id="name" />
    </div>

    <button @click="updatePizza" class="btn btn-warning">Actualizar</button>
    <button @click="$router.push({ name: 'pizzas' })" class="btn btn-secondary mx-2">Cancelar</button>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizza',
  data() {
    return {
      name: '',
      id: null
    }
  },
  mounted() {
    this.id = this.$route.params.id
    axios.get(`http://127.0.0.1:8000/api/pizzas/${this.id}`)
      .then(response => {
        this.name = response.data.name
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la pizza.', 'error')
      })
  },
  methods: {
    updatePizza() {
      axios.put(`http://127.0.0.1:8000/api/pizzas/${this.id}`, { name: this.name })
        .then(() => {
          Swal.fire('¡Actualizado!', 'Pizza actualizada correctamente.', 'success')
          this.$router.push({ name: 'pizzas' })
        })
        .catch(() => {
          Swal.fire('Error', 'No se pudo actualizar la pizza.', 'error')
        })
    }
  }
}
</script>
