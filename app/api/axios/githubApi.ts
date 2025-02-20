import axios from "axios";
const token = "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"

const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Load from .env
    },
});

export default githubApi;
