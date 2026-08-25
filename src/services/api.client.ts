import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 5000,
  headers: {
    "Content-type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && window.location.pathname !== "/login") {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (!token && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    } else if(!error.response){
      error.response.status = 500
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
