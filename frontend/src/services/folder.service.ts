import AxiosInstance from "@/api/axios.config";
import API from "@/constants/api.constant";
import { AxiosError } from "axios";

export class Folderservice {
  public static async getAllFolders() {
    try {
      const response = await AxiosInstance.get(API.folders);
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

  public static async getAllContactsFromFolder(
    folderId: number,
    options?: { perPage?: number; page?: number }
  ) {
    try {
      const response = await AxiosInstance.get(`${API.folders}/${folderId}`, {
        params: {
          per_page: options?.perPage,
          page: options?.page,
        },
      });

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
}
