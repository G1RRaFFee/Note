"use client";

import { JSX, useEffect, useState } from "react";
import { Pin } from "lucide-react";
import Link from "next/link";

import ContactService from "@/services/contact.service";
import { List } from "../List/List";
import { Contact } from "@/types/contact/entity.type";

import styles from "./PinnedContacts.module.css";

export const PinnedContacts = (): JSX.Element => {
  const [pinnedContacts, setPinnedContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchPinnedContacts = async () => {
      const { statusCode, data } = await ContactService.getPinnedContacts();
      if (statusCode === 200) {
        setPinnedContacts(data);
      }
    };
    fetchPinnedContacts();
  }, []);

  return (
    <List
      listClassName={styles.list}
      itemClassName={styles.item}
      items={pinnedContacts}
      keyExtractor={(pinnedContact) => pinnedContact.id}
      renderItem={(pinnedContact) => (
        <Link href={`/contacts/${pinnedContact.id}`}>
          {pinnedContact.lastName} {pinnedContact.firstName}{" "}
          {pinnedContact.middleName}
          <Pin size={16} />
          <div
            style={{
              fontSize: "14px",
              color: "#5a5a5a",
              marginTop: "4px",
            }}
          >
            {pinnedContact.about}
          </div>
        </Link>
      )}
    />
  );
};
