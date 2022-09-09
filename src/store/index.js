import Vuex from "vuex";
import dcu from "./modules/dcu";
import firmware from "./modules/firmware";

const store = new Vuex.Store({
    modules: { dcu, firmware },
    state: {},
    mutations: {},
    getters: {},
    actions: {},
});

export default store;