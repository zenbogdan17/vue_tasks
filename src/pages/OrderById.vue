<template>
  <div class="products__container">
    <div class="products__header">
      <h2>Приходы / 5</h2>

      <div class="products__select">
        <h3>Тип:</h3>

        <select
          class="form-select"
          v-model="selectedStatus"
          @change="sortArrayByStatus"
          aria-label="Default select example"
        >
          <option value="">Все</option>
          <option value="В ремонте">В ремонте</option>
          <option value="Свободен">Свободен</option>
        </select>
      </div>
      <div class="products__select">
        <h3>Спецификация:</h3>

        <select
          class="form-select"
          v-model="selectedSpecification"
          @change="sortArrayByStatusSpecification"
          aria-label="Default select example"
        >
          <option value="name">Назвиния</option>
          <option value="groupName">Названия прихода</option>
          <option value="date[0]">Дата 1</option>
          <option value="date[1]">Дата 2</option>
          <option value="UAN">Цена в UAN</option>
          <option value="USD">Цена в USD</option>
        </select>
      </div>
    </div>

    <div class="products">
      <div class="product" v-for="product in products" :key="product.id">
        <div class="product__status_indicator">
          <span :style="[product.isFree && 'background-color: yellow']"></span>
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
        <div class="product__date">
          <div class="item__date">
            <div>{{ product.date[0] }}</div>
            <div>{{ product.date[1] }}</div>
          </div>
        </div>
        <div class="product__state">{{ product.state }}</div>
        <div class="product__price">
          <div>
            {{ product.price[1].value }} {{ product.price[1].currency }}
          </div>
          <div>
            {{ product.price[0].value }}
            {{ product.price[0].currency }}
          </div>
        </div>
        <div class="product__group">{{ product.groupName || "-" }}</div>
        <div class="product__user">{{ product.userName || "-" }}</div>
        <div class="product__by_order">{{ order.title }}</div>
        <div class="product__date">
          <div>{{ product.date[0] }}</div>
          <div>{{ product.date[1] }}</div>
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      orderId: null,
      order: null,
      products: [],
      selectedStatus: null,
      selectedSpecification: null,
    };
  },

  computed: {
    ...mapGetters({
      getOrderById: "orders/getOrderById",
    }),
  },

  methods: {
    sortArrayByStatus() {
      if (this.selectedStatus) {
        const selectedItems = this.products.filter(
          (item) => item.status === this.selectedStatus
        );
        const otherItems = this.products.filter(
          (item) => item.status !== this.selectedStatus
        );
        this.products = [...selectedItems, ...otherItems];
      } else {
        this.products = this.order.product;
      }
    },

    sortArrayByStatusSpecification() {
      if (this.selectedSpecification) {
        if (this.selectedSpecification === "name") {
          this.products = this.products.sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          });
        }
        if (this.selectedSpecification === "groupName") {
          this.products = this.products.sort((a, b) => {
            if (a.groupName < b.groupName) {
              return -1;
            }
            if (a.groupName > b.groupName) {
              return 1;
            }
            return 0;
          });
        }

        if (
          this.selectedSpecification === "date[0]" ||
          this.selectedSpecification === "date[1]"
        ) {
          this.products = this.products.slice().sort((a, b) => {
            const dateA = new Date(a.date[1]);
            const dateB = new Date(b.date[1]);
            return dateA - dateB;
          });
        }
        if (this.selectedSpecification === "USD") {
          this.products = this.products.sort((a, b) => {
            const priceA = a.price.find(
              (item) => item.currency === "USD"
            ).value;
            const priceB = b.price.find(
              (item) => item.currency === "USD"
            ).value;

            return priceB - priceA;
          });
        }
        if (this.selectedSpecification === "UAN") {
          this.products = this.products.sort((a, b) => {
            const priceA = a.price.find(
              (item) => item.currency === "UAN"
            ).value;
            const priceB = b.price.find(
              (item) => item.currency === "UAN"
            ).value;

            return priceB - priceA;
          });
        }
      } else {
        this.products = this.order.products;
      }
    },

    handleRemoveProductById(id) {
      this.products = this.products.filter((product) => product.id !== id);
    },
  },

  mounted() {
    this.orderId = Number(this.$route.params.id);
    this.order = this.getOrderById(this.orderId);

    if (this.order) {
      this.products = this.order.product;
    }
  },
  watch: {},
};
</script>

<style scoped>
.products__container {
  padding: 30px 50px;
  overflow: auto;
}
.products__header {
  display: flex;
  gap: 40px;
  margin-bottom: 30px;
}

.products__select {
  display: flex;
  align-items: center;
  gap: 20px;
}

.products__select select {
  height: 40px;
  width: 250px;
}

.products {
  overflow-x: scroll;
}

.product {
  padding: 10px 15px;
  box-shadow: 2px 2px 10px rgb(209, 209, 209);
  color: rgb(100, 100, 100);
  border-radius: 10px;
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: 20px 40px 400px 100px 100px 100px 100px 300px 300px 300px 100px 40px;
  gap: 25px;
  align-items: center;
  cursor: pointer;
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
  top: -5px;
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

.product__date > div {
  text-align: center;
}
.product__date > div:first-child {
  color: #a1a1a1;
}

.product__state {
}

.product__price {
  justify-self: center;
}

.product__price > div {
  text-align: center;
}
.product__price > div:first-child {
  color: #a1a1a1;
}

.product__group {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product__user {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product__by_order {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product__date > div {
  text-align: center;
}
.product__date > div:first-child {
  color: #a1a1a1;
}

.product__remove {
  display: flex;
  justify-content: flex-end;
}
.product__remove i {
  font-size: 24px;
}

.modal__product__item {
  display: flex;
  gap: 20px;
}
</style>
