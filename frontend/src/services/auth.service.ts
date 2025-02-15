import AxiosInstance from "@/api/axios.config";
import { AxiosError, AxiosResponse } from "axios";

import SignUp from "@/interface/auth/signup.interface";

export default class AuthService {
  public static async getMe() {
    try {
      const response = await AxiosInstance.get("/auth/me", {
        withCredentials: true,
      });
      console.log(response);
      const { statusCode, message, data } = response.data;
      return {
        statusCode,
        message,
        data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        if (error.code === "ECONNABORTED") {
          console.error("Request timeout:", error.message);
        } else if (!error.response) {
          console.error("Network error – check your internet connection.");
        }
      } else {
        console.error("Unexpected error", error);
      }
      throw error;
    }
  }

  public static async signIn(email: string, password: string) {
    try {
      const { data } = await AxiosInstance.post("/auth/signin", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios error:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        if (error.code === "ECONNABORTED") {
          console.error("Request timeout:", error.message);
        } else if (!error.response) {
          console.error("Network error – check your internet connection.");
        }
      } else {
        console.error("Unexpected error", error);
      }
      throw error;
    }
  }

  public static async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<SignUp>> {
    return AxiosInstance.post<SignUp>("/auth/signup", {
      username,
      email,
      password,
    });
  }

  public static async logout(): Promise<void> {
    return AxiosInstance.post("/auth/logout");
  }
}
