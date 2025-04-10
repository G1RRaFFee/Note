import AxiosInstance from "@/api/axios.config";
import API from "@/constants/api.constant";
import { ContactDto } from "@/types/contact/contact.type";
import { AxiosError, AxiosResponse } from "axios";
// TODO: "Переписать с использованием интерфейсов"

export default class ContactService {
  public static async getPinnedContacts() {
    try {
      const response = await AxiosInstance.get(API.pinnedContacts);

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

  public static async searchContacts(
    query: string
  ): Promise<ContactDto.Response.Full.SearchContacts> {
    try {
      const { data }: AxiosResponse<ContactDto.Response.Full.SearchContacts> =
        await AxiosInstance.get(API.searchContacts, {
          params: { q: query },
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

  public static async getPaginatedContacts(
    page: number,
    perPage: number,
    orderBy?: "asc" | "desc"
  ): Promise<ContactDto.Response.Full.GetAllContacts> {
    try {
      const { data }: AxiosResponse<ContactDto.Response.Full.GetAllContacts> =
        await AxiosInstance.get(API.contacts, {
          withCredentials: true,
          params: { page: page, per_page: perPage, order_by: orderBy },
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
  ): Promise<ContactDto.Response.Full.GetContactById> {
    try {
      const { data }: AxiosResponse<ContactDto.Response.Full.GetContactById> =
        await AxiosInstance.get(`${API.contacts}/${id}`, {
          withCredentials: true,
        });
      console.log(data);
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

  public static async createContact(formData: ContactDto.Request.Create) {
    if (!formData) {
      throw Error("Нет данных для отправления");
    }

    // TODO: Вынести в middleware
    // const normalizedData = Object.fromEntries(
    //   Object.entries(formData).map(([key, value]) => [
    //     key,
    //     value === "" ? null : value,
    //   ])
    // );
    try {
      const response = await AxiosInstance.post("/contacts", formData, {
        withCredentials: true,
      });
      const { statusCode, message, data } = response.data;
      return {
        statusCode,
        message,
        data,
      };
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
