<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <img
        src="@/assets/logo.jpg"
        alt=""
        width="30"
        height="24"
        class="d-inline-block align-text-top"
      />
      Inventory
    </div>

    <div class="navbar__search">
      <input
        type="text"
        class="form-control"
        placeholder="Пошук"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </div>

    <div class="navbar__date">
      <h5>Today</h5>
      <div>{{ currentDate }} 🕓 {{ currentTime }}</div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",
      currentTime: "",
    };
  },

  mounted() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 60000);
  },

  methods: {
    updateDateTime() {
      const date = new Date();

      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");

      this.currentTime = `${hours}:${minutes}`;
      this.currentDate = date.toLocaleString().split(",")[0];
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 20px 70px 20px 20px;
  background-color: white;
  box-shadow: 0px 0px 10px gray;
}

.navbar__logo {
  text-align: center;
  font-size: 24px;
  color: green;
  font-weight: 700;
}

.navbar__logo img {
  width: 50px;
  height: 40px;
}

.navbar__search {
  margin-left: 100px;
  width: 300px;
}

.navbar__date {
  margin-left: auto;
}
</style>
