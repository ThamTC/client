<template>
  <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myModalLabel">Upload firmware to DCU</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body">
          <div>Select Firmware</div>
          <select name="select" id="select_firmware" @change="changeSelect">
            <option :value="firmware.filename" v-for="(firmware, idx) in firmwares" :key="idx">
              {{ firmware.filename }}
            </option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="close">Close</button>
          <button type="button" class="btn btn-primary" @click="upload">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DownLoadModal",
  data() {
    return {
      firmwareName: null,
    };
  },
  props: ["firmwares", "dcu_info"],
  computed: {
    ...mapGetters(["getFirmwares"]),
  },
  mounted() {
    console.log(this.getFirmwares);
  },
  methods: {
    close() {
      console.log("close");
    },
    upload() {
      this.$socket.emit("dcu_upload", {
        firmwareName: this.firmwareName ?? this.getFirmwares[0].filename,
        dcu_info: this.dcu_info,
      });
    },
    changeSelect(e) {
      this.firmwareName = e.target.value;
      console.log(e.target.value);
      console.log(this.dcu_info);
    },
  },
};
</script>

<style></style>
