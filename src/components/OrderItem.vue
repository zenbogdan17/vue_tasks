<template>
  <div class="item">
    <div class="item__title" @click="$router.push(`/${page}/${order.id}`)">
      <h5>{{ order.title }}</h5>
    </div>

    <div class="item__count" @click="$router.push(`/${page}/${order.id}`)">
      <i class="bi bi-list-ul"></i>
      <div>
        <div>{{ order.__v_raw.product.length }}</div>
        <div style="color: #a1a1a1">Продукта</div>
      </div>
    </div>

    <div class="item__date">
      <div>{{ order.__v_raw.date[0] }}</div>
      <div>{{ order.__v_raw.date[1] }}</div>
    </div>

    <div class="item__price">
      <div>
        {{ order.__v_raw.price[1].value }} {{ order.__v_raw.price[1].currency }}
      </div>
      <div>
        {{ order.__v_raw.price[0].value }} {{ order.__v_raw.price[0].currency }}
      </div>
    </div>

    <div class="item__remove">
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
            <div class="item__title">
              <h5>{{ order.title }}</h5>
            </div>

            <div class="item__count">
              <i class="bi bi-list-ul"></i>
              <div>
                <div>{{ order.__v_raw.product.length }}</div>
                <div style="color: #a1a1a1">Продукта</div>
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
              @click.stop="confirmRemove"
            >
              <i class="bi bi-trash"></i> Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirmRemove() {
      this.$emit("remove", this.order.id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.item {
  padding: 10px 15px;
  box-shadow: 2px 2px 10px rgb(209, 209, 209);
  color: rgb(100, 100, 100);
  border-radius: 10px;
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  align-items: center;
}

.item:hover {
  box-shadow: 3px 3px 10px rgb(183, 183, 183);
}

.item__title {
  grid-column: span 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.item__title h5:hover {
  text-decoration: underline;
}

.item__count {
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}
.item__count > div {
  font-size: 18px;
}
.item__count i {
  border: 1px solid rgb(167, 167, 167);
  border-radius: 100%;
  padding: 0px 8px;
  font-size: 28px;
  cursor: pointer;
}

.item__date {
  grid-column: span 2;
  justify-self: center;
}

.item__date > div {
  text-align: center;
}
.item__date > div:first-child {
  color: #a1a1a1;
}

.item__price {
  grid-column: span 2;
  justify-self: center;
}

.item__price > div {
  text-align: center;
}
.item__price > div:first-child {
  color: #a1a1a1;
}

.item__remove {
  grid-column: span 1;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
.item__remove i {
  font-size: 24px;
}

.modal-body {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
