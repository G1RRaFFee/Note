"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import ContactService from "@/services/contact.service";
import { List } from "@/components/List/List";
import { SideBar } from "@/components/SideBar/SideBar";

import Link from "next/link";

import styles from "./layout.module.css";
import { AxiosError } from "axios";
import { Contact } from "@/types/contact/contact.type";

interface ProtectedlayoutProps {
  readonly children: ReactNode;
}

const ProtectedLayout: FC<ProtectedlayoutProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Pick<Contact, "id" | "name">[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { statusCode, message, data } =
          await ContactService.getAllContacts();
        if (statusCode === 200) {
          console.log(message);
          setContacts(data.contacts);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.request) {
            setError("Error to load contacts");
          }
          if (error.response) {
            setError(error.response.data.message);
          }
        } else {
          setError(`Unexpected error: ${error}`);
        }
      }
    };

    fetchContacts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SideBar>
        {/* <Header> */}
        {/* <Container>
          Title
          Actions
          </Container> */}
        {/* <Search /> */}
        {/* </Header> */}
        <List
          items={contacts}
          renderItem={(contact) => (
            <Link href={`/contacts/${contact.id}`}>{contact.name}</Link>
          )}
          keyExtractor={(contact) => contact.id}
        />
      </SideBar>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default ProtectedLayout;
