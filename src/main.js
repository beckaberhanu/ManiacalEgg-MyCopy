import Vue from "vue";
// import App from "./App.vue";
import HomePage from "./components/HomePage.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(HomePage),
}).$mount("#app");
