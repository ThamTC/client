<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {},
  methods: {
    ...mapMutations(["insertDcuList"]),
  },
  sockets: {
    collect_dcu: function (data) {
      console.log(data);
      this.insertDcuList(data);
    },
  },
};
</script>

<style></style>
