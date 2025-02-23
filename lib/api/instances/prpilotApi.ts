import axios from "axios";

const prPilotApi = axios.create({
    baseURL: "https://pr-pilot-api.fly.dev/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },

});

export default prPilotApi;
