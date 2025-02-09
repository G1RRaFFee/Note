import ContactService from "@/services/contact.service";
import { Contact } from "@/types/contact/entity.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const usePaginatedContacts = () => {
  const [contacts, setContacts] = useState<
    Pick<Contact, "id" | "firstName" | "lastName" | "middleName" | "about">[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { statusCode, data } = await ContactService.getPaginatedContacts(
          page,
          20,
          "asc"
        );
        if (statusCode === 200) {
          setContacts((previousContacts) => [
            ...previousContacts,
            ...data.contacts,
          ]);

          setTotalPages(data.paginationDetails.totalPages);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setError("Failed to load contacts.");
        } else {
          setError("Unexpected error, please refresh the page.");
        }
      }
    };

    fetchContacts();
  }, [page]);

  return { contacts, page, totalPages, error, setPage };
};
