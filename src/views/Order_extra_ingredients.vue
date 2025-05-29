<template>
  <div class="container">
    <h1 class="text-start">Listado de Ingredientes Extra en Pedidos
      <button @click="newOrderExtraIngredient()" class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Pedido</th>
          <th scope="col">Ingrediente Extra</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orderExtraIngredients" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.order_id }}</td>
          <td>{{ item.ingredient_name }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <button @click="deleteOrderExtraIngredient(item.id)" class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editOrderExtraIngredient(item.id)" class="btn btn-warning mx-2">
              <font-awesome-icon icon="pencil" />
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
  name: 'OrderExtraIngredientIndex',
  data() {
    return {
      orderExtraIngredients: []
    }
  },
  methods: {
    deleteOrderExtraIngredient(id) {
      Swal.fire({
        title: `¿Desea eliminar el registro con ID ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/order-extra-ingredients/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('¡Eliminado!', '', 'success')
                this.orderExtraIngredients = response.data.items
              }
            })
            .catch(error => {
              Swal.fire('Error al eliminar', error.message, 'error')
            })
        }
      })
    },
    editOrderExtraIngredient(id) {
      this.$router.push({ name: 'EditOrderExtraIngredient', params: { id: `${id}` } })
    },
    newOrderExtraIngredient() {
      this.$router.push({ name: 'NewOrderExtraIngredient' })
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/order-extra-ingredients')
      .then(response => {
        this.orderExtraIngredients = response.data.items
      })
      .catch(error => {
        console.error("Error al cargar datos:", error)
      })
  }
}
</script>
