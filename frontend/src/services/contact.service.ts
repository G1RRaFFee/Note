import AxiosInstance from "@/api/axios.config";
import API from "@/constants/api.constant";
import {
  Contact,
  GetPaginatedContactsResponse,
} from "@/types/contact/contact.type";
import { AxiosError, AxiosResponse } from "axios";

export default class ContactService {
  public static async getPaginatedContacts(
    page: number,
    perPage: number
  ): Promise<GetPaginatedContactsResponse> {
    try {
      const { data }: AxiosResponse<GetPaginatedContactsResponse> =
        await AxiosInstance.get(API.contacts, {
          withCredentials: true,
          params: { page: page, per_page: perPage },
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

  public static async getContactById(
    id: number
  ): Promise<AxiosResponse<Contact> | null> {
    try {
      const responce = await AxiosInstance.get<Contact>(`/contacts/${id}`, {
        withCredentials: true,
      });
      return responce;
    } catch (error) {
      console.log("Error fetching contactById:", error);
      throw error;
    }
  }

  public static async createContact(data: FormData) {
    if (!data) {
      throw Error("Нет данных для отправления");
    }
    try {
      const response = await AxiosInstance.post("/contacts", data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.log("Error fetching createContact:", error);
      throw error;
    }
  }

  public static async getContactAvatar(filename: string) {
    try {
      const response = await AxiosInstance.get(`files/${filename}`, {
        withCredentials: true,
        responseType: "blob",
        headers: {},
      });
      return response;
    } catch (error) {
      console.log("Error fetching avatar: ", error);
      throw error;
    }
  }
}
