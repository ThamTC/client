<template>
  <div class="container bg-color-container p-1">
    <div class="d-flex justify-content-center m-3">
      <input ref="input_hidden" class="d-none" type="file" id="file" @change="changeFile" multiple accept=".bin" />
      <label for="file" class="label_file p-2">Choose a file...</label>
      <span class="ms-3 pt-2">{{ fileName }}</span>
      <button
        type="button"
        :class="'btn btn-outline-' + `${btn_color}` + ' ms-3 upload_btn'"
        :disabled="!file"
        @click="uploadFile"
      >
        {{ uploadMsg }}
      </button>
    </div>
    <div>
      <span class="d-flex justify-content-center text-danger"> {{ error }}</span>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-start mb-2">
            <button class="btn btn-success" @click="collectDCU">Update Firmware to all DCU</button>
          </div>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FileName</th>
                <th scope="col">Size(kB)</th>
                <th scope="col">Updated</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in listFile" :key="idx">
                <th scope="row">{{ idx + 1 }}</th>
                <td>{{ item.filename }}</td>
                <td>{{ item.size / 1000 }}</td>
                <td>0</td>
                <td>
                  <a href="#" class="icon-delete">
                    <i :id="idx" class="fas fa-trash" @click="deleteFW(item.filename)"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <ListDCU></ListDCU>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fwRequest from "../api";
import ListDCU from "./ListDCU.vue";
import { mapMutations } from "vuex";
export default {
  name: "HomeComponnent",
  components: { ListDCU },
  data() {
    return {
      file: "",
      listFile: [],
      fileName: "No file choosen",
      uploadMsg: "Upload",
      btn_color: "secondary",
      error: "",
    };
  },
  created() {
    fwRequest
      .getList()
      .then((response) => {
        if (response.status === 200) {
          this.listFile = response.data;
          this.listFile.reverse();
          this.setFirmwares(this.listFile);
        } else console.log("data: ", response);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    ...mapMutations(["setFirmwares"]),
    changeFile(event) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      this.btn_color = "success";
      this.error = "";
    },
    uploadFile() {
      this.uploadMsg = "Uploading";
      fwRequest
        .upload(this.file)
        .then((response) => {
          if (response.status == 200) {
            this.uploadMsg = "Uploaded";
            this.listFile.unshift({ filename: this.fileName, size: this.file.size });
          } else {
            this.uploadMsg = "Upload";
            this.file = "";
            this.fileName = "No file choosen";
            this.error = response.data.error.message;
          }
          console.log("code: ", response);
        })
        .catch((err) => {
          this.uploadMsg = "Upload";
          console.log(err);
        });
    },
    deleteFW(filename) {
      fwRequest
        .deleteFirmware(filename)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            this.listFile = this.listFile.filter((item) => {
              return item.filename != filename;
            });
          } else console.log("delete failed");
        })
        .catch((err) => console.log("error: ", err));
    },
  },
};
</script>

<style>
.label_file {
  color: white;
  background-color: #198754;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}
.upload_btn {
  cursor: not-allowed;
}
.bg-color-container {
  background-color: #27b99b38;
}
.icon-delete {
  color: rgb(255, 59, 59);
}
.icon-delete:hover {
  color: rgb(197, 0, 0);
}
</style>
