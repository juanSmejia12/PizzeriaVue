<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nueva Sucursal</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Sucursal
      </div>
      <div class="card-body">
        <form @submit.prevent="saveBranch">
          <div class="row mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="building" />
              </div>
              <input type="text" class="form-control" id="name" placeholder="Nombre de la sucursal"
                     v-model="branch.name" required />
            </div>
          </div>

          <div class="row mb-3">
            <label for="address" class="form-label">Dirección:</label>
            <div class="input-group">
              <div class="input-group-text">
                <font-awesome-icon icon="map-marker-alt" />
              </div>
              <input type="text" class="form-control" id="address" placeholder="Dirección de la sucursal"
                     v-model="branch.address" required />
            </div>
          </div>

          <button class="btn btn-primary" type="submit">Guardar</button>
          <button class="btn btn-secondary mx-2" @click="cancel">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'NewBranch',
  data() {
    return {
      branch: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Branches' })
    },
    async saveBranch() {
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/branches', this.branch)
        if (res.status === 200) {
          this.$router.push({ name: 'Branches' })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sucursal registrada exitosamente',
            showConfirmButton: false,
            timer: 2000
          })
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo registrar la sucursal.', 'error')
      }
    }
  }
}
</script>