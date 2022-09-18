import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const gymApi = axios.create({
  baseURL: process.env.baseUrl,
});

// Request interceptors for API calls
gymApi.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = Cookies.get("token");
    if(config.headers) {
      config.headers.Authorization = ` ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default gymApi;
