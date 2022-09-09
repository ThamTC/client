import { createApp } from "vue";
import App from "./App.vue";
import "@arcgis/core/assets/esri/themes/light/main.css";
import esriConfig from "@arcgis/core/config.js";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from "vue-3-socket.io";
import { io } from "socket.io-client";
import store from "./store";

esriConfig.assetsPath = "/assets";
const app = createApp(App);
app.use(
    new VueSocketIO({
        debug: true,
        connection: io(process.env.VUE_APP_ROOT_API || "http://localhost:3000"),
    })
);
app.use(store);
app.use(VueAxios, axios);
app.use(router);
app.mount("#app");