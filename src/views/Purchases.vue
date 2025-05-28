<template>
  <div class="container">
    <h1 class="text-start">
      Listado de Compras
      <button @click="newPurchase" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Proveedor</th>
          <th>Materia Prima</th>
          <th>Cantidad</th>
          <th>Precio de Compra</th>
          <th>Fecha de Compra</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(purchase, index) in purchases" :key="purchase.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ purchase.supplier_name }}</td>
          <td>{{ purchase.raw_material_name }}</td>
          <td>{{ purchase.quantity }}</td>
          <td>{{ purchase.purchase_price }}</td>
          <td>{{ purchase.purchase_date }}</td>
          <td>
            <button @click="editPurchase(purchase.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
            </button>
            <button @click="deletePurchase(purchase.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
          </td>
        </tr>
        <tr v-if="purchases.length === 0">
          <td colspan="7" class="text-center">No hay registros de compras.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'PurchasesIndex',
  data() {
    return {
      purchases: []
    }
  },
  methods: {
    newPurchase() {
      this.$router.push({ name: 'PurchasesNew' })
    },
    editPurchase(id) {
      this.$router.push({ name: 'PurchasesEdit', params: { id } })
    },
    deletePurchase(id) {
      Swal.fire({
        title: `¿Desea eliminar la compra con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/purchases/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.purchases = response.data.purchases
              } else {
                Swal.fire('Error', 'No se pudo eliminar la compra.', 'error')
              }
            })
            .catch(() => {
              Swal.fire('Error', 'No se pudo eliminar la compra.', 'error')
            })
        }
      })
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/purchases')
      .then(response => {
        this.purchases = response.data.purchases
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo cargar la lista de compras.', 'error')
      })
  }
}
</script>