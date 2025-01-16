"use client";

import ContactService, { Contact } from "@/services/contact.service";
import { FC, useEffect, useState } from "react";

import { KeyValueTable } from "@/components/Table/KeyValueTable/KeyValueTable";

interface ContactCardProps {
  id: number;
}

export const ContactCard: FC<ContactCardProps> = ({ id }) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContactById = async () => {
      try {
        setIsLoading(true);
        const { data } = await ContactService.getContactById(id);
        setContact(data);
      } catch (error) {
        setError("Failed to load contacts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactById();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // Показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Показываем ошибку
  }

  if (!contact) {
    return <div>No contact found</div>; // Обработка случая, если контакт пустой
  }

  return (
    <>
      <KeyValueTable data={contact} />
    </>
  );
};
