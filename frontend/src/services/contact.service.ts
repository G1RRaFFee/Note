import apiClient from "@/api/axios.config";
import { AxiosResponse } from "axios";

export interface Contact {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly folderID: number[];
  readonly noteID: number;
  readonly avatar: string;
  readonly phone: string;
  readonly birthday: string;
  readonly address: string;
}

export default class ContactService {
  public static async getAllContacts(): Promise<AxiosResponse<Contact[]>> {
    try {
      const responce = await apiClient.get<Contact[]>("/contacts", {
        withCredentials: true,
      });

      return responce;
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
}
