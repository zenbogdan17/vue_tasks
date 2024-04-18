<template>
  <div class="sidebar">
    <img
      class="sidebar__logo"
      src="@/assets/logoAvatar.png"
      alt="logo avatar"
    />

    <ul class="sidebar__list_link">
      <li
        :class="[isActiveRoute.split('/')[1] === 'order' && 'active']"
        @click="$router.push('/order')"
      >
        ПРИХОД
      </li>
      <li
        :class="[isActiveRoute.split('/')[1] === 'products' && 'active']"
        @click="$router.push('/products')"
      >
        ГРУППЫ
      </li>
      <li>ПРОДУКТЫ</li>
      <li>ПОЛЬЗОВАТЕЛИ</li>
      <li>НАСТРОЙКИ</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    isActiveRoute() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  min-width: 200px;
  padding: 20px;
  box-shadow: 0px 5px 20px gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  gap: 60px;
  margin-top: -100px;
}

.sidebar__logo {
  width: 80px;
}

.sidebar__list_link {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  margin-left: -32px;
}

.sidebar__list_link li {
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: 600;
}

.sidebar__list_link li:hover {
  border-bottom: 1px solid black;
}

.active {
  border-bottom: 3px solid rgb(75, 196, 71);
}
</style>
