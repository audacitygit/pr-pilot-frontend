import axios from "axios";

const prPilotApi = axios.create({
    baseURL: "https://pr-pilot-next.fly.dev",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },

});

export default prPilotApi;
