import apiClient from "@/api/axios.config";
import { AxiosResponse } from "axios";

export interface Contact {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly folderID: number[];
  readonly noteID: number;
  readonly avatarUrl: string;
  readonly phone: string;
  readonly birthday: string;
  readonly address: string;
}

export default class ContactService {
  public static async getAllContacts(): Promise<AxiosResponse<Contact[]>> {
    try {
      const response = await apiClient.get<Contact[]>("/contacts", {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      console.log("Error fetching contacts:", error);
      throw error;
    }
  }

  public static async getContactById(
    id: number
  ): Promise<AxiosResponse<Contact> | null> {
    try {
      const responce = await apiClient.get<Contact>(`/contacts/${id}`, {
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
      const response = await apiClient.post("/contacts", data, {
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
      const response = await apiClient.get(`files/${filename}`, {
        withCredentials: true,
        responseType: "blob",
      });
      return response;
    } catch (error) {
      console.log("Error fetching avatar: ", error);
      throw error;
    }
  }
}
