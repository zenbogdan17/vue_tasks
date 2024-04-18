<template>
  <div class="groups__container">
    <div class="groups__header">
      <button>+</button>
      <h2>Приходы / 5</h2>
    </div>

    <div class="groups__list">
      <div>
        <div
          class="orders__list"
          v-for="order in orders"
          :key="order.id"
          @click="handleOrderClick(order)"
        >
          <div class="orders__count">
            <i class="bi bi-list-ul"></i>
            <div>
              <div>{{ order.product.length }}</div>
              <div style="color: #a1a1a1">Продукта</div>
            </div>
          </div>

          <div class="orders__date">
            <div>{{ order.__v_raw.date[0] }}</div>
            <div>{{ order.__v_raw.date[1] }}</div>
          </div>

          <div :class="[orderId === order.id ? 'ordere__arctive' : 'hidden']">
            <i class="bi bi-caret-right-fill"></i>
          </div>
        </div>
      </div>

      <div class="product__list">
        <div class="orders__title" v-if="order">
          <h5>{{ order.title }}</h5>
        </div>

        <div class="product__btn" v-if="order">
          <span>+</span>
          Добавить продукт
        </div>

        <div
          class="product__item"
          v-for="product in products"
          :key="product.id"
        >
          <div class="product__status_indicator">
            <span
              :style="[product.isFree && 'background-color: yellow']"
            ></span>
          </div>
          <div class="product__image">
            <img :src="product.image" />
          </div>
          <div class="product__info">
            <div class="product__name">
              {{ product.name }}
            </div>
            <div class="product__id">{{ product.id }}</div>
          </div>
          <div
            class="product__status"
            :style="[product.isFree && 'color: yellow']"
          >
            {{ product.status }}
          </div>
          <div class="product__remove">
            <i
              type="button"
              class="bi bi-trash-fill"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Вы уверены, что хотите удалить этот приход
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div class="modal-body">
                  <div class="modal__product__item">
                    <div class="product__image">
                      <img :src="product.image" />
                    </div>
                    <div class="product__info">
                      <div class="product__name">
                        {{ product.name }}
                      </div>
                      <div class="product__id">{{ product.id }}</div>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Отменить
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-bs-dismiss="modal"
                    @click="handleRemoveProductById(product.id)"
                  >
                    <i class="bi bi-trash"></i> Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      orderId: null,
      order: "",
      products: [],
      isShowModalWindow: false,
      removeProducId: null,
    };
  },
  methods: {
    handleOrderClick(order) {
      if (order && order.id) {
        this.$router.push(`/products/${order.id}`);
      }
    },

    handleRemoveProductById(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
  },
  watch: {
    "$route.params.id": function (newOrderId) {
      this.orderId = Number(newOrderId);
      this.order = this.getOrderById(this.orderId);
      if (this.order) {
        this.products = this.order.product;
      }
    },
  },
  computed: {
    ...mapGetters({
      getOrderById: "orders/getOrderById",
      removeProductById: "product/removeProductById",
    }),
    ...mapState({
      orders: (state) => state.orders.orders,
      product: (state) => state.product.product,
    }),
  },

  mounted() {
    this.orderId = Number(this.$route.params.id);
    this.order = this.getOrderById(this.orderId);

    if (this.order) {
      this.products = this.order.product;
    }
  },
};
</script>
<style scoped>
.groups__container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px 50px;
  overflow: auto;
  width: 100%;
}
.groups__header {
  display: flex;
  gap: 20px;
}

.groups__header button {
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

.groups__header button:hover {
  border: 4px solid rgba(55, 92, 55, 0.5);
}

.groups__list {
  display: flex;
  gap: 20px;
}

.orders__list {
  box-shadow: 2px 2px 10px rgb(209, 209, 209);
  border-radius: 10px;
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: 2fr 3fr 1fr;
  gap: 25px;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 10px 15px;
}

.orders__list:hover {
  box-shadow: 4px 4px 6px rgb(209, 209, 209);
}

.orders__count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.orders__count > div {
  font-size: 18px;
}
.orders__count i {
  font-size: 34px;
}

.orders__date {
  justify-self: center;
}

.orders__date > div {
  text-align: center;
}
.orders__date > div:first-child {
  color: #a1a1a1;
}

.ordere__arctive {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #a1a1a1;

  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.product__list {
  box-shadow: 2px 2px 10px rgb(209, 209, 209);
  border-radius: 10px;
  padding: 10px 15px;
  width: 100%;
  align-self: flex-start;
}

.orders__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product__btn {
  display: flex;
  color: rgb(0, 255, 0);
  gap: 10px;
  font-size: 18px;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
}

.product__btn span {
  color: white;
  background-color: rgb(0, 255, 0);
  border-radius: 50%;
  padding: 0px 6px;
}

.product__item {
  display: grid;
  margin-top: 30px;
  grid-template-columns: 0.5fr 1fr 6fr 2fr 1fr;
  cursor: pointer;
}

.product__item:hover {
  border-bottom: 2px solid rgb(56, 101, 56);
}

.product__status_indicator {
  position: relative;
}
.product__status_indicator span {
  position: absolute;
  border-radius: 100%;
  width: 10px;
  height: 10px;
  background: #000;
  left: 10px;
  top: 20px;
}

.product__image {
}
.product__image img {
  width: 50px;
}

.product__name {
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product__id {
  color: #a1a1a1;
}
.product__status {
  font-weight: 500;
}
.product__remove {
  display: flex;
  justify-content: flex-end;
}
.product__remove i {
  font-size: 24px;
}

.hidden {
  display: none;
}
.modal__product__item {
  display: flex;
  gap: 20px;
}
</style>
