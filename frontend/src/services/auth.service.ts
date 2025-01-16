import api from "@/api/axios.config";
import { AxiosResponse } from "axios";

import SignIn from "@/interface/auth/signin.interface";
import SignUp from "@/interface/auth/signup.interface";

export default class AuthService {
  public static async signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<SignIn>> {
    return api.post<SignIn>("/auth/signin", { email, password });
  }

  public static async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<SignUp>> {
    return api.post<SignUp>("/auth/signup", { username, email, password });
  }

  public static async logout(): Promise<void> {
    return api.post("/auth/logout");
  }
}
