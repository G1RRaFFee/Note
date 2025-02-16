"use client";
// TODO: Проверить работу Paginator в ContactsList (Добавить больше контактов )
import Link from "next/link";

import { Fragment, JSX, useState } from "react";
import { List } from "../List/List";

import styles from "./Contacts.module.css";
import { useContactsFromFolder } from "@/hooks/useContactsFromFolder";
import { groupContactsByInitial } from "@/helpers/contact.helper";
import { Contact } from "@/types/contact/entity.type";
import Paginator from "../Paginator/Paginator";

interface ContactslistProps {
  folderId: string | number;
}

export const ContactsList = ({ folderId }: ContactslistProps): JSX.Element => {
  const [page, setPage] = useState(1);
  const perPage = 20;

  const { contactsFromFolder, hasMore } = useContactsFromFolder(folderId, {
    perPage: perPage,
    page: page,
  });
  const { initials, groupedContacts } =
    groupContactsByInitial(contactsFromFolder);

  const handleLoadMore = (): void => {
    setPage((prev) => prev + 1);
  };

  return (
    <Paginator onLoadMore={handleLoadMore} hasMore={hasMore}>
      <List<string>
        listClassName={styles.contactsList}
        itemClassName={styles.initialGroup}
        items={initials}
        renderItem={(initial) => (
          <Fragment>
            <span className={styles.initial}>{initial}</span>
            <List<Contact>
              listClassName={styles.list}
              itemClassName={styles.item}
              items={groupedContacts[initial]}
              renderItem={(contact) => (
                <Fragment>
                  <Link
                    className={styles.link}
                    href={`/folders/${folderId}/contacts/${contact.id}`}
                  >
                    {contact.lastName} {contact.firstName} {contact.middleName}
                    <span className={styles.about}>{contact.about}</span>
                  </Link>
                </Fragment>
              )}
            />
          </Fragment>
        )}
      />
    </Paginator>
  );
};
