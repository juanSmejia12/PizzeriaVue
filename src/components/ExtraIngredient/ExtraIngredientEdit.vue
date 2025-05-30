<template>
  <div class="container" v-if="form">
    <h2>Editar Extra Ingredient</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Precio</label>
        <input
          type="number"
          id="price"
          v-model.number="form.price"
          class="form-control"
          step="0.01"
          min="0"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">Actualizar</button>
      <button @click="cancel" type="button" class="btn btn-secondary ms-2">
        Cancelar
      </button>
    </form>
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ExtraIngredientEdit',
  data() {
    return {
      form: null,
    }
  },
  created() {
    this.loadExtraIngredient()
  },
  methods: {
    loadExtraIngredient() {
      const id = this.$route.params.id
      axios
        .get(`http://127.0.0.1:8000/api/extra-ingredients/${id}`)
        .then(response => {
          this.form = response.data
        })
        .catch(() => {
          Swal.fire('Error', 'No se encontró el Extra Ingredient', 'error')
          this.$router.push({ name: 'ExtraIngredients' })
        })
    },
    submitForm() {
      const id = this.$route.params.id
      axios
        .put(`http://127.0.0.1:8000/api/extra-ingredients/${id}`, this.form)
        .then(() => {
          Swal.fire('Éxito', 'Extra Ingredient actualizado', 'success')
          this.$router.push({ name: 'ExtraIngredients' })
        })
        .catch(error => {
          Swal.fire(
            'Error',
            error.response?.data?.message || 'Error al actualizar',
            'error'
          )
        })
    },
    cancel() {
      this.$router.push({ name: 'ExtraIngredients' })
    },
  },
}
</script>
