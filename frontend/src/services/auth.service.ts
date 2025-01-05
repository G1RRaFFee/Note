import api from "@/http";
import { AuthResponse } from "@/models/response/auth.response";
import { AxiosResponse } from "axios";

export default class AuthService {
  public static async signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/auth/signin", { email, password });
  }

  public static async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<any> {
    return api.post("/auth/signup", { username, email, password });
  }

  public static async logout(): Promise<void> {
    return api.post("/auth/logout");
  }
}
