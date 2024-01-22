import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://host.docker.internal:80",
});

interface IResponse {
  status: number;
  message: string;
  data: any;
}

// axiosInstance.interceptors.request.use((config) => {
//   const storage = localStorage.getItem("bms-storage-auth") || "";
//   const token = storage ? JSON.parse(storage).token : "";
//   if (token) {
//     config.headers["Authorization"] = `bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return {
//       ...res.data,
//     };
//   },
//   (err) => {
//     return Promise.reject(err.response.data);
//   }
// );

class Http {
  post(path: string, body: any, option?: any) {
    return axiosInstance.post<any, IResponse>(path, body, option);
  }
  put(path: string, body: any, option?: any) {
    return axiosInstance.put<any, IResponse>(path, body, option);
  }
  get(path: string, option?: any) {
    return axiosInstance.get<any, IResponse>(path, option);
  }
  delete(path: string, option?: any) {
    return axiosInstance.delete<any, IResponse>(path, option);
  }
}

export const http = new Http();
