import { createStore } from "vuex";
import { OrdersModule } from "./OrdersModule";
import { ProductModule } from "./ProductModule";

export default createStore({
  modules: {
    orders: OrdersModule,
    product: ProductModule,
  },
});
