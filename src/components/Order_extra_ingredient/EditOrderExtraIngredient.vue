<template>
  <div class="container text-start">
    <h1 class="text-primary fw-bold">Editar Ingrediente Extra en Pedido</h1>
    <div class="card">
      <div class="card-header fw-bold">
        Registro
      </div>
      <div class="card-body">
        <form @submit.prevent="updateOrderExtraIngredient">

          <div class="row mb-3">
            <label for="order_id" class="form-label">Pedido:</label>
            <div class="input-group">
              <div class="input-group-text"> <font-awesome-icon icon="receipt" /></div>
              <select class="form-select" v-model="orderExtraIngredient.order_id">
                <option v-for="order in orders" :key="order.id" :value="order.id">
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
                <option v-for="ingredient in extraIngredients" :key="ingredient.id" :value="ingredient.id">
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

          <button class="btn btn-primary" type="submit">Actualizar</button>
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
  name: 'OrderExtraIngredientEdit',
  data() {
    return {
      orderExtraIngredient: {
        id: 0,
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
    async updateOrderExtraIngredient() {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/order-extra-ingredients/${this.orderExtraIngredient.id}`,
        this.orderExtraIngredient
      )
      if (res.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro actualizado exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.$router.push({ name: 'Order_extra_ingredients' })
      }
    },
    async loadData() {
      const id = this.$route.params.id
      try {
        const [ordersRes, ingredientsRes, recordRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/orders'),
          axios.get('http://127.0.0.1:8000/api/extra-ingredients'),
          axios.get(`http://127.0.0.1:8000/api/order-extra-ingredients/${id}`)
        ])
        this.orders = ordersRes.data.orders
        this.extraIngredients = ingredientsRes.data.extra_ingredients
        this.orderExtraIngredient = recordRes.data.item 
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>