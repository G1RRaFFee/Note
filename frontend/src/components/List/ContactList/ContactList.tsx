"use client";

import ContactService, { Contact } from "@/services/contact.service";
import { FC, useEffect, useState } from "react";

import styles from "./ContactList.module.css";

export const ContactList: FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await ContactService.getAllContacts();
        console.log(response);
        setContacts(response.data);
      } catch (error) {
        console.log("Ошибка при запросе контактов", error);
      }
    };

    fetchContacts();
  }, []);
  return (
    <ul className={styles.list}>
      {contacts.map((contact) => (
        <li className={styles.item} key={contact.id}>
          {contact.name}
        </li>
      ))}
    </ul>
  );
};
