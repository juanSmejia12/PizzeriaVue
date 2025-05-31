<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Nuevo Ingrediente Extra en Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Registro
      </div>
      <div class="card-body">
        <form @submit.prevent="saveOrderExtraIngredient">

          <div class="row mb-3">
            <label for="order_id" class="form-label">Pedido:</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="receipt" /></div>
              <select class="form-select" v-model="orderExtraIngredient.order_id">
                <option selected value="0">Seleccione un pedido</option>
                <option v-for="order in orders" :value="order.id" :key="order.id">
                  {{ order.id }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="extra_ingredient_id" class="form-label">Ingrediente Extra:</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="carrot" /></div>
              <select class="form-select" v-model="orderExtraIngredient.extra_ingredient_id">
                <option selected value="0">Seleccione un ingrediente extra</option>
                <option v-for="ingredient in extraIngredients" :value="ingredient.id" :key="ingredient.id">
                  {{ ingredient.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="quantity" class="form-label">Cantidad:</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="hashtag" /></div>
              <input type="number" class="form-control" id="quantity" placeholder="Cantidad"
                     v-model="orderExtraIngredient.quantity" />
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
  name: 'OrderExtraIngredientCreate',
  data() {
    return {
      orderExtraIngredient: {
        order_id: 0,
        extra_ingredient_id: 0,
        quantity: 0
      },
      orders: [],
      extraIngredients: []
    }
  },
  methods: {
    cancel() {
      this.$router.push({ name: 'Order_extra_ingredients' })
    },
    async saveOrderExtraIngredient() {
      const res = await axios.post('http://127.0.0.1:8000/api/order-extra-ingredients', this.orderExtraIngredient)
      if (res.status === 200) {
        this.$router.push({ name: 'Order_extra_ingredients' })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro guardado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:8000/api/orders')
      .then(response => {
        this.orders = response.data.orders
      })
    axios.get('http://127.0.0.1:8000/api/extra-ingredients')
      .then(response => {
        this.extraIngredients = response.data.extra_ingredients
      })
  }
}
</script>