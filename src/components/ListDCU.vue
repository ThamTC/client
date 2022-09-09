<template>
  <div>
    <div class="d-flex justify-content-start mb-2">
      <button class="btn btn-success" @click="collectDCU">Collect DCU</button>
    </div>
    <div class="">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">DCU_id</th>
            <th scope="col">Fw_Ver</th>
            <th scope="col">Relay</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(dcu, idx) in listDcu" :key="idx">
            <th scope="row">1</th>
            <td>{{ dcu.dcu_id }}</td>
            <td>{{ dcu.fw_ver }}</td>
            <td>{{ dcu.relay }}</td>
            <td>
              <a href="#" @click="download"><i :id="idx" class="fas fa-download"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <DownloadModal :firmwares="firmwares" :dcu_info="dcu_info"></DownloadModal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DownloadModal from "./modals/DownloadModal.vue";
export default {
  name: "ListDCU",
  components: { DownloadModal },
  data() {
    return {
      dcu_list: [],
      firmwares: [],
      dcu_info: {},
    };
  },
  computed: {
    ...mapGetters(["getListDcu", "getFirmwares"]),
    listDcu() {
      return this.getListDcu;
    },
  },
  watch: {
    listDcu() {
      this.dcu_list = this.getListDcu;
    },
  },
  created() {},
  methods: {
    collectDCU() {
      this.$socket.emit("collect_dcu", "collect_dcu");
    },
    download(e) {
      // console.log("id: ", this.getListDcu[e.target.id].dcu_info);
      this.dcu_info = this.getListDcu[e.target.id];
      var myModalEl = document.getElementById("myModal");
      // eslint-disable-next-line no-undef
      var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
        keyboard: false,
      });
      this.firmwares = this.getFirmwares;
      myModal.show();
      myModalEl.addEventListener("show.bs.modal", function (event) {
        console.log(event);
      });
      myModalEl.addEventListener("hidden.bs.modal", function (event) {
        console.log(event);
      });
    },
  },
};
</script>

<style>
.list-dcu-container {
  height: 100px;
  /* background-color: rgba(255, 255, 255, 0.836); */
}
</style>
