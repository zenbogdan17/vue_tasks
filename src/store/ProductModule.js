import { Product } from "@/app";

export const ProductModule = {
  namespaced: true,
  state: () => ({
    product: Product,
  }),
  getters: {
    // removeProductById: (state) => (id) => {
    //   return state.product.filter((product) => product.id !== id);
    // },
  },
  mutations: {},
  actions: {},
};
