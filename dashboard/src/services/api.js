import axios from "axios";

const api = axios.create({
  baseURL: "https://trade-spark-backend.onrender.com",
  withCredentials: true,
});

export default api;
