import { useState, useEffect } from "react";
import { Contact } from "@/types/contact/entity.type";
import ContactService from "@/services/contact.service";
import { AxiosError } from "axios";

export const useContact = (id: number) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactById = async () => {
      try {
        const { statusCode, data } = await ContactService.getContactById(id);
        if (statusCode == 200) {
          setContact(data);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setContactError("Failed to load contacts.");
        } else {
          setContactError("Unexpected error, please refresh the page.");
        }
      }
    };

    fetchContactById();
  }, [id]);

  return { contact, setContact, contactError };
};
