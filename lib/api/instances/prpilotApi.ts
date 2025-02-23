import axios from "axios";

const prPilotApi = axios.create({
    baseURL: process.env.PR_PILOT_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },

});

export default prPilotApi;
