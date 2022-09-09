import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "./components/HomeComponent.vue";
import WebMap from "./components/WebMap.vue";

const routes = [{
        path: "/home",
        component: HomeComponent,
    },
    {
        path: "/webmap",
        component: WebMap,
    },
];
const router = createRouter({
    routes: routes,
    history: createWebHistory(),
    linkExactActiveClass: "active",
});

export default router;