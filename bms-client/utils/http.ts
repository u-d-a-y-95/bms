import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

interface IResponse {
  status: number;
  message: string;
  data: any;
}

axios.interceptors.request.use((config) => {
  const storage = localStorage.getItem("bms-storage-auth") || "";
  const token = storage ? JSON.parse(storage).token : "";
  if (token) {
    config.headers["Authorization"] = `bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => {
    return {
      ...res.data,
    };
  },
  (err) => {
    return Promise.reject(err.response.data);
  }
);

class Http {
  post(path: string, body: any, option?: any) {
    return axios.post<any, IResponse>(path, body, option);
  }
  put(path: string, body: any, option?: any) {
    return axios.put<any, IResponse>(path, body, option);
  }
  get(path: string, option?: any) {
    return axios.get<any, IResponse>(path, option);
  }
  delete(path: string, option?: any) {
    return axios.delete<any, IResponse>(path, option);
  }
}

export const http = new Http();
