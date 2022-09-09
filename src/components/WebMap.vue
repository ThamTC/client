<template>
  <div class="mapDiv"></div>
</template>

<script>
import ArcGISMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
export default {
  name: "WebMap",
  props: {
    msg: String,
  },
  mounted() {
    const map = new ArcGISMap({
      portalItem: {
        id: this.msg,
      },
    });
    const view = new MapView({
      map,
      container: this.$el,
    });
    view.when(() => {
      console.log("view ready");
    });
  },
};
</script>

<style>
.mapDiv {
  margin: 0 auto;
  width: 80%;
  height: 500px;
}
</style>
