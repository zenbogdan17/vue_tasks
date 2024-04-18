import GroupsById from "@/pages/GroupsById.vue";
import OrderById from "@/pages/OrderById.vue";
import OrdersPage from "@/pages/OrdersPage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: OrdersPage,
  },
  {
    path: "/order",
    component: OrdersPage,
  },
  {
    path: "/order/:id",
    component: OrderById,
  },

  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/products/:id",
    component: GroupsById,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
