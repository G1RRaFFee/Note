"use client";

import Link from "next/link";

import { JSX, useEffect, useState } from "react";
import { List } from "../List/List";

import styles from "./Contacts.module.css";
import { Contact } from "@/types/contact/entity.type";
import { Folderservice } from "@/services/folder.service";

function groupContactsByInitial(contacts: Contact[]) {
  const groupedContacts: { [key: string]: Contact[] } = {};
  contacts.forEach((contact) => {
    const initial = (
      contact.lastName?.charAt(0) || contact.firstName?.charAt(0)
    )?.toUpperCase();

    if (initial) {
      if (!groupedContacts[initial]) {
        groupedContacts[initial] = [];
      }
      groupedContacts[initial].push(contact);
    }
  });

  const initials = Object.keys(groupedContacts).sort();

  return { initials, groupedContacts };
}

interface ContactslistProps {
  folderId: string | number;
}

export const ContactsList = ({ folderId }: ContactslistProps): JSX.Element => {
  const [contacts, setContacts] = useState([]);
  const { initials, groupedContacts } = groupContactsByInitial(contacts);
  // TODO: Вынести в хук и переписать сервис папок
  useEffect(() => {
    const fetchContactsFromFolder = async (folderId: number) => {
      const { statusCode, data } = await Folderservice.getAllContactsFromFolder(
        folderId
      );
      if (statusCode === 200) {
        setContacts(data);
      }
    };

    fetchContactsFromFolder(Number(folderId));
  }, [folderId]);

  return (
    <>
      <List
        listClassName={styles.contactsList}
        itemClassName={styles.initialGroup}
        items={initials}
        renderItem={(initial) => (
          <>
            <span className={styles.initial}>{initial}</span>
            <List
              listClassName={styles.list}
              itemClassName={styles.item}
              items={groupedContacts[initial]}
              renderItem={(contact) => (
                <>
                  <Link
                    className={styles.link}
                    href={`/folders/${folderId}/contacts/${contact.id}`}
                  >
                    {contact.lastName} {contact.firstName} {contact.middleName}
                    <span className={styles.about}>{contact.about}</span>
                  </Link>
                </>
              )}
            />
          </>
        )}
      />
    </>
  );
};
