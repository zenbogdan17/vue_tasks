import { Orders } from "@/app";

export const OrdersModule = {
  namespaced: true,
  state: () => ({
    orders: Orders,
  }),
  getters: {
    getOrderById: (state) => (orderId) => {
      return state.orders.find((order) => order.id === orderId);
    },
  },
  mutations: {
    removeOrder(state, orderId) {
      state.orders = state.orders.filter((order) => order.id !== orderId);
    },
  },
  actions: {},
};
