"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import ContactService, { Contact } from "@/services/contact.service";
import { List } from "@/components/List/List";
import { SideBar } from "@/components/SideBar/SideBar";

import Link from "next/link";

import styles from "./layout.module.css";

interface ProtectedlayoutProps {
  readonly children: ReactNode;
}

const ProtectedLayout: FC<ProtectedlayoutProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await ContactService.getAllContacts();
        setContacts(data);
      } catch (error) {
        setError("Failed to load contacts");
        console.log(error);
      }
    };

    fetchContacts();
  }, []);

  const handleContactClick = (contact: Contact) => {
    console.log(contact.name);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SideBar>
        <List
          items={contacts}
          renderItem={(contact) => (
            <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
          )}
          keyExtractor={(contact) => contact.id}
          onItemClick={handleContactClick}
        />
      </SideBar>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default ProtectedLayout;
