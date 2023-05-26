import axios, { AxiosRequestConfig } from "axios";
import { APP_CONSTANTS } from "../constants";

const axiosConfig: AxiosRequestConfig = {
  baseURL: APP_CONSTANTS.BASE_URL,
};
const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
