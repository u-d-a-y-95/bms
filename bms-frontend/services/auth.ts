import { http } from "@/utils/http";

export const signup = (body: any) => {
  return http.post("/auth/signup", body);
};
export const login = (body: any) => {
  return http.post("/auth/login", body);
};
