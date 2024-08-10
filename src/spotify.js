import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "f0a303c765dd47d7920182977a24debf";
const redirectURI = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndPoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
