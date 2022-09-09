import axios from "axios";
axios.defaults.withCredentials = true;
const fwRequest = {
    upload: async(file) => {
        try {
            const resData = await axios.post(
                "/api/v1/firmware", { file: file }, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return resData;
        } catch (error) {
            return error.response;
        }
    },
    getList: async() => {
        try {
            const resData = await axios.get("/api/v1/firmware");
            return resData;
        } catch (error) {
            return error.response;
        }
    },
    deleteFirmware: async(filename) => {
        try {
            const resData = await axios.delete("/api/v1/firmware", {
                data: { filename: filename },
            });
            return resData;
        } catch (error) {
            return error.response;
        }
    },
};
export default fwRequest;