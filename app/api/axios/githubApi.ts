import axios from "axios";

const token = process.env.GITHUB_TOKEN

const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Load from .env
    },
});

export default githubApi;
