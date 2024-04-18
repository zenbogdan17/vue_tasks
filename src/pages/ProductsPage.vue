<template>
  <div class="orders__container">
    <div class="order__header">
      <button>+</button>
      <h2>Продукти / 5</h2>
    </div>
    <div>
      <order-item
        v-for="order in orders"
        :key="order.id"
        :order="order"
        :page="'products'"
      />
    </div>
  </div>
</template>
<script>
import OrderItem from "@/components/OrderItem.vue";
import { mapState } from "vuex";

export default {
  components: { OrderItem },

  computed: {
    ...mapState({
      orders: (state) => state.orders.orders,
      product: (state) => state.product.product,
    }),
  },
};
</script>
<style scoped>
.orders__container {
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  gap: 10px;
  width: 100%;
}
.order__header {
  display: flex;
  gap: 20px;
}

.order__header button {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgb(76, 190, 76);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid rgba(55, 92, 55, 0.4);
  font-size: 24px;
  line-height: 40px;
}

.order__header button:hover {
  border: 4px solid rgba(55, 92, 55, 0.5);
}
</style>
