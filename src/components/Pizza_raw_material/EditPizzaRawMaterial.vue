<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Relación Pizza - Materia Prima</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Relación
      </div>
      <div class="card-body">
        <form @submit.prevent="updateRelation">
          <div class="mb-3">
            <label for="pizza" class="form-label">Pizza:</label>
            <select id="pizza" class="form-select" v-model="relation.pizza_id" required>
              <option value="" disabled>Seleccione una pizza</option>
              <option v-for="pizza in pizzas" :key="pizza.id" :value="pizza.id">
                {{ pizza.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="rawMaterial" class="form-label">Materia Prima:</label>
            <select id="rawMaterial" class="form-select" v-model="relation.raw_material_id" required>
              <option value="" disabled>Seleccione una materia prima</option>
              <option v-for="material in rawMaterials" :key="material.id" :value="material.id">
                {{ material.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <input type="number" step="0.01" class="form-control" id="quantity"
                   v-model="relation.quantity" required />
          </div>

          <button type="submit" class="btn btn-primary">Actualizar</button>
          <button class="btn btn-secondary mx-2" @click="cancel" type="button">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditPizzaRawMaterial',
  data() {
    return {
      relation: {
        pizza_id: '',
        raw_material_id: '',
        quantity: ''
      },
      pizzas: [],
      rawMaterials: []
    }
  },
  methods: {
    cancel() {
      // ✅ Corregido: nombre correcto de la ruta
      this.$router.push({ name: 'Pizza_raw_materials' })
    },
    async updateRelation() {
      try {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/pizza-raw-materials/${this.$route.params.id}`,
          this.relation
        )
        if (res.status === 200) {
          this.$router.push({ name: 'Pizza_raw_materials' }) // ✅ nombre coincidente con router
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Relación actualizada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch {
        Swal.fire('Error', 'No se pudo actualizar la relación.', 'error')
      }
    },
    async loadData() {
      const [relationRes, pizzasRes, materialsRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/pizza-raw-materials/${this.$route.params.id}`),
        axios.get('http://127.0.0.1:8000/api/pizzas'),
        axios.get('http://127.0.0.1:8000/api/raw-materials')
      ])
      this.relation = relationRes.data.item 
      this.pizzas = pizzasRes.data.pizzas
      this.rawMaterials = materialsRes.data.raw_materials
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>
